import prisma from "../lib/prisma.js";

const calculateShippingCost = (shippingMethod) => {
  const shippingCosts = {
    STANDARD: 9.99,
    EXPRESS: 19.99,
    PICKUP: 0,
  };

  return shippingCosts[shippingMethod] || 9.99;
};

// @desc Create order ============================================================
// @route POST /orders
// @access Private
const createOrder = async (req, res) => {
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

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Użytkownik nie znaleziony",
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Brakujące dane zamówienia",
      });
    }

    // 1.1. generate shipping data
    const shippingAddress = {
      username: user.username,
      lastName: user.lastName,
      email: user.email,
      company: user?.company,
      NIP: user?.NIP,
      street: user.street,
      apartmentNr: user.apartmentNr,
      city: user.city,
      postalCode: user.postalCode,
      country: user.country,
      phoneNumbers: user.phoneNumbers,
    };

    // 2. get all items from cart
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
    return res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Get order ===============================================================
// @route GET /orders
// @access Private
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
