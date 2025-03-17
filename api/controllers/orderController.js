import prisma from "../lib/prisma.js";

const calculateShippingCost = (shippingMethod) => {
  const shippingCosts = {
    STANDARD: 9.99,
    EXPRESS: 19.99,
    PICKUP: 0,
  };

  return shippingCosts[shippingMethod] || 9.99;
};

const createOrder = async (req, res, next) => {
  try {
    const { userId, shippingAddress, shippingMethod, paymentMethod } = req.body;

    if (!userId || !shippingAddress || !shippingMethod || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Brakujące dane zamówienia",
      });
    }

    // 1. get all items from cart
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Koszyk jest pusty",
      });
    }

    // 2. calculate order price
    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + item.quantity * item.product.price;
    }, 0);

    // 3. create transaction for atomicity of operation
    const order = await prisma.$transaction(async (tx) => {
      // 3.1. Utwórz nowe zamówienie
      const newOrder = await tx.order.create({
        data: {
          userId,
          totalAmount,
          status: "PENDING",
          shippingAddress,
          shippingMethod,
          shippingCost: calculateShippingCost(shippingMethod),
          paymentMethod,
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

      // 3.2. clear cart after order is created
      await tx.cartItem.deleteMany({
        where: { userId },
      });

      return newOrder;
    });

    // 4. return response with order id and other data
    return res.status(201).json({
      success: true,
      message: "Zamówienie zostało utworzone",
      data: {
        orderId: order.id,
        totalAmount: order.totalAmount,
        status: order.status,
        paymentStatus: order.paymentStatus,
      },
    });
  } catch (error) {
    console.error("Błąd podczas tworzenia zamówienia:", error);
    return next(error);
  }
};

const getOrderDetails = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { userId } = req.user;

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
              },
            },
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Zamówienie nie zostało znalezione",
      });
    }

    // check if order belongs to user
    if (order.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Brak dostępu do tego zamówienia",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Błąd podczas pobierania szczegółów zamówienia:", error);
    return next(error);
  }
};

export default {
  createOrder,
  getOrderDetails,
};
