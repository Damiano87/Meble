import prisma from "../lib/prisma.js";

// @desc Get top liked products
// @route GET /products
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

export default {
  getTopLikedProducts,
};
