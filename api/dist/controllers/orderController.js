import prisma from "../lib/prisma.js";
import { Prisma } from "@prisma/client";
export const createOrder = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                username: true,
                lastName: true,
                email: true,
                company: true,
                NIP: true,
                street: true,
                apartmentNr: true,
                city: true,
                postalCode: true,
                country: true,
                phoneNumbers: true,
            },
        });
        if (!userId) {
            res.status(400).json({
                success: false,
                message: "Brakujące dane zamówienia",
            });
            return;
        }
        if (!user) {
            res.status(404).json({
                success: false,
                message: "Użytkownik nie znaleziony",
            });
            return;
        }
        const shippingAddress = {
            username: user.username ?? "",
            lastName: user.lastName ?? "",
            email: user.email ?? "",
            company: user?.company ?? "",
            NIP: user?.NIP ?? "",
            street: user.street ?? "",
            apartmentNr: user.apartmentNr ?? "",
            city: user.city ?? "",
            postalCode: user.postalCode ?? "",
            country: user.country ?? "",
            phoneNumbers: user.phoneNumbers ?? "",
        };
        const cartItems = await prisma.cartItem.findMany({
            where: { userId },
            include: { product: true },
        });
        if (cartItems.length === 0) {
            res.status(400).json({
                success: false,
                message: "Koszyk jest pusty",
            });
            return;
        }
        const totalAmount = cartItems.reduce((sum, item) => {
            return sum + item.quantity * item.product.price;
        }, 0);
        const order = await prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    totalAmount,
                    status: "PENDING",
                    statusHistory: ["PENDING"],
                    shippingAddress,
                    paymentStatus: "PENDING",
                    orderItems: {
                        create: cartItems.map((item) => ({
                            quantity: item.quantity,
                            price: item.product.price,
                            productId: item.productId,
                        })),
                    },
                },
            });
            await tx.cartItem.deleteMany({
                where: { userId },
            });
            return newOrder;
        });
        res.status(201).json({
            success: true,
            message: "Zamówienie zostało utworzone",
            data: {
                orderId: order.id,
                totalAmount: order.totalAmount,
                status: order.status,
                paymentStatus: order.paymentStatus,
            },
        });
        return;
    }
    catch (error) {
        console.error("Błąd podczas tworzenia zamówienia:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
export const getUserOrders = async (req, res) => {
    const userId = req.userId;
    const { status, sort, price, productName } = req.query;
    const newest = sort === "newest" ? "desc" : undefined;
    const oldest = sort === "oldest" ? "asc" : undefined;
    const highestSum = price === "highest" ? "desc" : undefined;
    const lowestSum = price === "lowest" ? "asc" : undefined;
    try {
        const orders = await prisma.order.findMany({
            where: {
                userId,
                ...(typeof status === "string" && { status: status.toUpperCase() }),
                ...(productName && {
                    orderItems: {
                        some: {
                            product: {
                                name: {
                                    contains: productName,
                                    mode: "insensitive",
                                },
                            },
                        },
                    },
                }),
            },
            include: {
                orderItems: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                images: true,
                            },
                        },
                    },
                },
            },
            orderBy: [
                ...(newest ? [{ createdAt: newest }] : []),
                ...(oldest ? [{ createdAt: oldest }] : []),
                ...(highestSum ? [{ totalAmount: highestSum }] : []),
                ...(lowestSum ? [{ totalAmount: lowestSum }] : []),
                ...(!newest && !oldest && !highestSum && !lowestSum
                    ? [{ createdAt: Prisma.SortOrder.desc }]
                    : []),
            ],
        });
        res.status(200).json({ message: "success", data: orders });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getOrderDetails = async (req, res) => {
    const { orderId } = req.params;
    const userId = req.userId;
    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                orderItems: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                images: true,
                                price: true,
                            },
                        },
                    },
                },
            },
        });
        if (!order) {
            res.status(404).json({
                success: false,
                message: "Zamówienie nie zostało znalezione",
            });
            return;
        }
        if (order.userId !== userId) {
            res.status(403).json({
                success: false,
                message: "Brak dostępu do tego zamówienia",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: order,
        });
        return;
    }
    catch (error) {
        console.error("Błąd podczas pobierania szczegółów zamówienia:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
export const cancellOrder = async (req, res) => {
    const userId = req.userId;
    const { orderId } = req.body;
    try {
        const order = await prisma.order.findUnique({
            where: {
                userId_id: {
                    userId,
                    id: orderId,
                },
            },
            select: {
                statusHistory: true,
            },
        });
        await prisma.order.update({
            where: {
                userId_id: {
                    userId,
                    id: orderId,
                },
            },
            data: {
                status: "CANCELLED",
                paymentStatus: "FAILED",
                statusHistory: {
                    set: [...(order?.statusHistory || []), "CANCELLED"],
                },
            },
        });
        res.json({ message: "Anulowano zamówienie" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
