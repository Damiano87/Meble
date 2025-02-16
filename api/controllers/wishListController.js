import prisma from "../lib/prisma.js";

// @desc Get user wishlist ==============================================================
// @route GET /wishlist
// @access Private
const getWishlist = async (req, res) => {
  const userId = req.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const skip = (page - 1) * limit;

    // get wishlist items and total count
    const [wishlistItems, total] = await Promise.all([
      prisma.wishlist.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          productId: true,
          product: {
            select: {
              name: true,
              price: true,
              images: true,
              stock: true,
            },
          },
        },
        skip,
        take: limit,
      }),
      prisma.wishlist.count({
        where: {
          userId,
        },
      }),
    ]);

    // prepare pagination data
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Cache-Control header to control caching behavior
    // res.set("Cache-Control", "private, max-age=300"); // 5 minutues cache

    return res.status(200).json({
      status: "success",
      data: {
        items: wishlistItems,
        pagination: {
          total,
          totalPages,
          currentPage: page,
          limit,
          hasNextPage,
          hasPrevPage,
        },
      },
    });
  } catch (error) {
    console.error("Wishlist fetch error:", {
      userId,
      error: error.message,
      stack: error.stack,
    });
  }
};

// @desc Add to wishlist ==============================================================
// @route POST /wishlist
// @access Private
const addToWishlist = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.body;

  try {
    await prisma.wishlist.create({
      data: {
        userId,
        productId,
      },
    });
    res.status(201).json({ message: "Product added to wishlist" });
  } catch (error) {
    console.error(error);
    // check if error is due to unique constraint
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Product already in wishlist" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Delete from wishlist ==============================================================
// @route DELETE /wishlist
// @access Private
const deleteFromWishlist = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.body;

  try {
    await prisma.wishlist.delete({
      where: { userId_productId: { userId, productId } },
    });

    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default { getWishlist, addToWishlist, deleteFromWishlist };
