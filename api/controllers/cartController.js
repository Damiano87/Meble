import prisma from "../lib/prisma.js";

// add to cart =========================================================
const addToCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.userId;
  const quantity = req.body.quantity || 0;

  try {
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // count quantity of a specific product in cart
    const itemCount = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      select: { quantity: true },
    });

    // if itemCount is null, set quantity to 0
    const itemCountQuantity = itemCount?.quantity ?? 0;

    const addedProduct = await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      update: {
        quantity: itemCountQuantity + quantity,
      },
      create: {
        userId,
        productId,
        quantity,
      },
    });

    res.status(200).json(addedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all cart items ===============================================
const getCartItems = async (req, res) => {
  const userId = req.userId;

  try {
    // get all cart items for a specific user
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            stock: true,
          },
        },
      },
    });

    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { addToCart, getCartItems };
