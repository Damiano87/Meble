import prisma from "../lib/prisma.js";

const rateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    // check if rating is between 1 and 5
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Ocena musi być między 1 a 5" });
    }

    // check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ message: "Produkt nie został znaleziony" });
    }

    // transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      // add or update rating
      const userRating = await tx.rating.upsert({
        where: {
          userId_productId: {
            userId: userId,
            productId: productId,
          },
        },
        update: {
          rating: rating,
          comment: comment,
        },
        create: {
          userId: userId,
          productId: productId,
          rating: rating,
          comment: comment,
        },
      });

      // get all ratings for the product
      const allRatings = await tx.rating.groupBy({
        by: ["rating"],
        where: { productId: productId },
        _count: true,
      });

      // calculate stats
      const stats = {
        fiveStars: 0,
        fourStars: 0,
        threeStars: 0,
        twoStars: 0,
        oneStar: 0,
        totalRatings: 0,
        averageRating: 0,
      };

      let totalScore = 0;
      allRatings.forEach((item) => {
        const count = item._count;
        switch (item.rating) {
          case 5:
            stats.fiveStars = count;
            break;
          case 4:
            stats.fourStars = count;
            break;
          case 3:
            stats.threeStars = count;
            break;
          case 2:
            stats.twoStars = count;
            break;
          case 1:
            stats.oneStar = count;
            break;
        }
        totalScore += item.rating * count;
        stats.totalRatings += count;
      });

      stats.averageRating = totalScore / stats.totalRatings;

      // update product rating
      const productRating = await tx.productRating.upsert({
        where: { productId: productId },
        update: stats,
        create: {
          productId: productId,
          ...stats,
        },
      });

      return { userRating, productRating };
    });

    res.json(result);
  } catch (error) {
    console.error("Error in rateProduct:", error);
    res
      .status(500)
      .json({ message: "Wystąpił błąd podczas oceniania produktu" });
  }
};

// get product ratings
const getProductRatings = async (req, res) => {
  try {
    const { productId } = req.params;

    const productRating = await prisma.productRating.findUnique({
      where: { productId: productId },
    });

    if (!productRating) {
      return res.json({
        averageRating: 0,
        totalRatings: 0,
        fiveStars: 0,
        fourStars: 0,
        threeStars: 0,
        twoStars: 0,
        oneStar: 0,
      });
    }

    res.json(productRating);
  } catch (error) {
    console.error("Error in getProductRatings:", error);
    res.status(500).json({ message: "Wystąpił błąd podczas pobierania ocen" });
  }
};

// get user rating
const getUserRating = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const rating = await prisma.rating.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    res.json(rating || { rating: 0, comment: "" });
  } catch (error) {
    console.error("Error in getUserRating:", error);
    res.status(500).json({
      message: "Wystąpił błąd podczas pobierania oceny użytkownika",
    });
  }
};

// delete rating
const deleteRating = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    await prisma.$transaction(async (tx) => {
      // Usunięcie oceny
      await tx.rating.delete({
        where: {
          userId_productId: {
            userId: userId,
            productId: productId,
          },
        },
      });

      // update productRating
      const allRatings = await tx.rating.groupBy({
        by: ["rating"],
        where: { productId: productId },
        _count: true,
      });

      const stats = {
        fiveStars: 0,
        fourStars: 0,
        threeStars: 0,
        twoStars: 0,
        oneStar: 0,
        totalRatings: 0,
        averageRating: 0,
      };

      let totalScore = 0;
      allRatings.forEach((item) => {
        const count = item._count;
        switch (item.rating) {
          case 5:
            stats.fiveStars = count;
            break;
          case 4:
            stats.fourStars = count;
            break;
          case 3:
            stats.threeStars = count;
            break;
          case 2:
            stats.twoStars = count;
            break;
          case 1:
            stats.oneStar = count;
            break;
        }
        totalScore += item.rating * count;
        stats.totalRatings += count;
      });

      if (stats.totalRatings > 0) {
        stats.averageRating = totalScore / stats.totalRatings;
      }

      await tx.productRating.update({
        where: { productId: productId },
        data: stats,
      });
    });

    res.json({ message: "Ocena została usunięta" });
  } catch (error) {
    console.error("Error in deleteRating:", error);
    res.status(500).json({ message: "Wystąpił błąd podczas usuwania oceny" });
  }
};

export default { rateProduct, getProductRatings, getUserRating, deleteRating };
