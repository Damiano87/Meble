import { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import { Prisma } from "@prisma/client";

// @desc Create order ============================================================
// @route POST /orders
// @access Private
export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.userId;

  try {
    // 1. get user data
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

    // 1.1. generate shipping data
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

    // 2. get all items from cart
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

    // 3. calculate order price
    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + item.quantity * item.product.price;
    }, 0);

    // 4. create transaction for atomicity of operation
    const order = await prisma.$transaction(async (tx) => {
      // 4.1. create new order
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
              price: item.product.price, // save current price
              productId: item.productId,
            })),
          },
        },
      });

      // 4.2. clear cart after order is created
      await tx.cartItem.deleteMany({
        where: { userId },
      });

      return newOrder;
    });

    // 5. return response with order id and other data
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
  } catch (error) {
    console.error("Błąd podczas tworzenia zamówienia:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

// @desc Get user orders ===============================================================
// @route GET /orders
// @access Private
export const getUserOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.userId;
  const { status, sort, price, productName } = req.query;

  const newest: Prisma.SortOrder | undefined =
    sort === "newest" ? "desc" : undefined;
  const oldest: Prisma.SortOrder | undefined =
    sort === "oldest" ? "asc" : undefined;

  const highestSum: Prisma.SortOrder | undefined =
    price === "highest" ? "desc" : undefined;
  const lowestSum: Prisma.SortOrder | undefined =
    price === "lowest" ? "asc" : undefined;

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
                  contains: productName as string | undefined,
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Get order ===============================================================
// @route GET /orders/order
// @access Private
export const getOrderDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { orderId } = req.params;
  const userId = req.userId;

  try {
    // find specific order
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

    // check if order belongs to user
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
  } catch (error) {
    console.error("Błąd podczas pobierania szczegółów zamówienia:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

// @desc Cancell order ===============================================================
// @route PATCH /orders/cancell-order
// @access Private
export const cancellOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.userId as string;
  const { orderId } = req.body;

  try {
    // get statusHistory if exists
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

    // update order
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
