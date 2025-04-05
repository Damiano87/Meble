import { Request, Response } from "express";
import prisma from "../lib/prisma.js";

// @desc Get all products
// @route GET /products
// @access Public
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { search, sort, category } = req.query;

  const allProducts = await prisma.product.findMany({
    where: {
      AND: [
        typeof search === "string"
          ? {
              name: {
                contains: search,
                mode: "insensitive",
              },
            }
          : {},
        typeof category === "string"
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
export const getTopLikedProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
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
export const getTrendyProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
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
export const getSingleProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "Please provide an ID" });
    return;
  }

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  const wishProductCount = await prisma.wishlist.count({
    where: { productId: id },
  });

  res.status(200).json({ ...product, wishProductCount });
};
