import prisma from "../lib/prisma.js";

// @desc Get all products
// @route GET /products
// @access Public
const getProducts = async (req, res) => {
  const { search, sort, category } = req.query;

  const allProducts = await prisma.product.findMany({
    where: {
      AND: [
        search
          ? {
              name: {
                contains: search,
                mode: "insensitive",
              },
            }
          : {},
        category
          ? {
              category,
            }
          : {},
      ],
    },
    orderBy: (() => {
      switch (sort) {
        case "price-up":
          return { price: "asc" };
        case "price-down":
          return { price: "desc" };
        case "most-popular":
          return { likes: "desc" };
        case "alphabetic":
          return { name: "asc" };
        default:
          return undefined;
      }
    })(),
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
  });

  res.status(200).json(allProducts);
};

// @desc Get top liked products
// @route GET /products/top-eight
// @access Public
const getTopLikedProducts = async (req, res) => {
  const topLikedProducts = await prisma.product.findMany({
    take: 8,
    orderBy: {
      likes: "desc",
    },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
  });

  res.json(topLikedProducts);
};

// @desc Get trendy products
// @route GET /products/trendy
// @access Public
const getTrendyProducts = async (req, res) => {
  const trendyProducts = await prisma.product.findMany({
    where: {
      trendy: true,
    },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
  });

  res.json(trendyProducts);
};

// @desc Get single product
// @route GET /products/:id
// @access Public
const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Please provide an ID" });
  }

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
};

export default {
  getProducts,
  getTopLikedProducts,
  getTrendyProducts,
  getSingleProduct,
};
