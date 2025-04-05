import Stripe from "stripe";
import prisma from "../lib/prisma.js";
import { Request, Response } from "express";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key doesn't exist");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc checkout session ==============================================================
// @route POST /stripe/api/create-checkout-session
// @access Private
export const handler = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId as string;
  const { orderId } = req.body;
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    // 1. get order items of specific user
    const latestOrder = await prisma.order.findUnique({
      where: {
        userId_id: {
          userId,
          id: orderId,
        },
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!latestOrder) {
      res.status(404).json({ message: "No order found" });
      return;
    }

    // 2.1. subtotal of the cart items
    const subtotal = latestOrder.orderItems?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    // 2.2. free shipping if subtotal is above threshold
    const FREE_SHIPPING_THRESHOLD = 20000;
    const SHIPPING_COST = 1599;
    const isEligibleForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
    const shippingCost = isEligibleForFreeShipping ? 0 : SHIPPING_COST;

    // 2.3. discount based on subtotal
    const discountPercentage =
      subtotal >= 50000 ? 10 : subtotal >= 30000 ? 5 : 0;

    // 2.4. create a coupon for the discount if discountPercentage > 0
    let discountId = null;
    if (discountPercentage > 0) {
      const coupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: "once",
      });
      discountId = coupon.id;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        ...latestOrder.orderItems.map((item) => ({
          price_data: {
            currency: "pln",
            product_data: {
              name: item.product.name,
            },
            unit_amount: item.product.price,
          },
          quantity: item.quantity,
        })),
        // add shipping cost as a separate line item
        ...(shippingCost > 0
          ? [
              {
                price_data: {
                  currency: "pln",
                  product_data: {
                    name: "Koszt wysyłki",
                  },
                  unit_amount: shippingCost,
                },
                quantity: 1,
              },
            ]
          : []),
      ],
      metadata: {
        orderId: latestOrder.id,
        userId,
      },
      mode: "payment",
      success_url: `${frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/cart`,
      discounts: discountId ? [{ coupon: discountId }] : [],
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: errorMessage });
  }
};

// @desc Verify payment ==============================================================
// @route GET /stripe/api/verify-payment
// @access Private
export const verifyPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { session_id } = req.query;

  if (!session_id) {
    res.status(400).json({ success: false, message: "Session ID is required" });
    return;
  }

  try {
    // verify the payment using the session ID
    const session = await stripe.checkout.sessions.retrieve(
      session_id as string
    );

    if (session.payment_status === "paid") {
      // get additional data from the session metadata if needed
      const orderDetails = {
        orderId: session.metadata?.orderId || session.id,
        amount: session.amount_total
          ? (session.amount_total / 100).toFixed(2)
          : "0",
        currency: session.currency?.toUpperCase(),
        customer: session.customer_details?.email || "Unknown",
      };

      // change order status to "COMPLETED" and payment status to "PAID"
      // session metadata
      const orderId = session.metadata?.orderId as string;
      const userId = session.metadata?.userId as string;

      // get statusHistory
      // 4.1. get statusHistory if exists
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
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "COMPLETED",
          paymentStatus: "PAID",
          statusHistory: {
            set: [...(order?.statusHistory || []), "COMPLETED"],
          },
        },
      });

      res.json({
        success: true,
        message: "Payment successful",
        orderDetails,
        updatedOrder,
      });
      return;
    } else {
      res.json({
        success: false,
        message: "Payment not completed",
      });
      return;
    }
  } catch (error) {
    console.error("Error verifying Stripe payment:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying payment",
    });
    return;
  }
};
