import { Request, Response } from "express";
import prisma from "../lib/prisma.js";

// rate product ======================================================
export const rateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.userId as string;

    // check if rating is between 1 and 5
    if (rating < 1 || rating > 5) {
      res.status(400).json({ message: "Ocena musi być między 1 a 5" });
      return;
    }

    // check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      res.status(404).json({ message: "Produkt nie został znaleziony" });
      return;
    }

    // transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      // add or update rating
      const userRating = await tx.rating.upsert({
        where: {
          userId_productId: {
            userId,
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

// get product ratings  ================================================
export const getProductRatings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;

    // check if productId exists
    if (!productId) {
      res.status(400).json({ message: "Nie podano ID produktu" });
      return;
    }

    const productRating = await prisma.productRating.findUnique({
      where: { productId: productId },
    });

    if (!productRating) {
      res.json({
        averageRating: 0,
        totalRatings: 0,
        fiveStars: 0,
        fourStars: 0,
        threeStars: 0,
        twoStars: 0,
        oneStar: 0,
      });
      return;
    }

    res.json(productRating);
  } catch (error) {
    console.error("Error in getProductRatings:", error);
    res.status(500).json({ message: "Wystąpił błąd podczas pobierania ocen" });
  }
};

// Get users who rated product =========================================

export const getProductRaters = async (
  req: Request,
  res: Response
): Promise<void> => {
  type QueryProps = {
    numberOfStars: string[];
    page: string;
    limit: string;
  };

  try {
    const { productId } = req.params;
    const { numberOfStars, page = "1", limit = "10" } = req.query as QueryProps;

    // calculate skip for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Validate productId
    if (!productId) {
      res.status(400).json({
        message: "ID nie istnieje",
      });
      return;
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      res.status(404).json({
        message: "Nie znaleziono produktu",
      });
      return;
    }

    // first get total count of ratings for this product
    const totalCount = await prisma.rating.count({
      where: {
        productId,
        ...(numberOfStars && {
          rating: {
            in: numberOfStars.map(Number),
          },
        }),
      },
    });

    // Get all ratings with user data for this product
    const productRaters = await prisma.rating.findMany({
      where: {
        productId,
        // if array exists get specific ratings othrwise get all
        ...(numberOfStars && {
          rating: {
            in: numberOfStars.map(Number),
          },
        }),
      },
      select: {
        rating: true,
        comment: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: parseInt(limit),
    });

    // Transform data to cleaner format
    const formattedRaters = productRaters.map((rater) => ({
      id: rater.user.id,
      username: rater.user.username,
      rating: rater.rating,
      comment: rater.comment,
      createdAt: rater.createdAt,
    }));

    res.json({
      raters: formattedRaters,
      totalPages: Math.ceil(totalCount / parseInt(limit)),
      currentPage: parseInt(page),
      totalCount,
    });
  } catch (error) {
    console.error("Error in getProductRaters:", error);
    res.status(500).json({
      message: "Wystąpił błąd podczas pobierania listy oceniających",
    });
  }
};

// get single user rating ====================================================
export const getUserRating = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const userId = req.userId as string;

    const rating = await prisma.rating.findUnique({
      where: {
        userId_productId: {
          userId,
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

// delete rating ======================================================
export const deleteRating = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const userId = req.userId as string;

    await prisma.$transaction(async (tx) => {
      // Usunięcie oceny
      await tx.rating.delete({
        where: {
          userId_productId: {
            userId,
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
