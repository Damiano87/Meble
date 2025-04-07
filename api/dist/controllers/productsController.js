import prisma from "../lib/prisma.js";
export const getProducts = async (req, res) => {
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
export const getTopLikedProducts = async (req, res) => {
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
export const getTrendyProducts = async (req, res) => {
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
export const getSingleProduct = async (req, res) => {
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
