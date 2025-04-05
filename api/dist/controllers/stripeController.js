import Stripe from "stripe";
import prisma from "../lib/prisma.js";
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key doesn't exist");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const handler = async (req, res) => {
    const userId = req.userId;
    const { orderId } = req.body;
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed" });
        return;
    }
    try {
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
        const subtotal = latestOrder.orderItems?.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        const FREE_SHIPPING_THRESHOLD = 20000;
        const SHIPPING_COST = 1599;
        const isEligibleForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
        const shippingCost = isEligibleForFreeShipping ? 0 : SHIPPING_COST;
        const discountPercentage = subtotal >= 50000 ? 10 : subtotal >= 30000 ? 5 : 0;
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
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ message: errorMessage });
    }
};
export const verifyPayment = async (req, res) => {
    const { session_id } = req.query;
    if (!session_id) {
        res.status(400).json({ success: false, message: "Session ID is required" });
        return;
    }
    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        if (session.payment_status === "paid") {
            const orderDetails = {
                orderId: session.metadata?.orderId || session.id,
                amount: session.amount_total
                    ? (session.amount_total / 100).toFixed(2)
                    : "0",
                currency: session.currency?.toUpperCase(),
                customer: session.customer_details?.email || "Unknown",
            };
            const orderId = session.metadata?.orderId;
            const userId = session.metadata?.userId;
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
        }
        else {
            res.json({
                success: false,
                message: "Payment not completed",
            });
            return;
        }
    }
    catch (error) {
        console.error("Error verifying Stripe payment:", error);
        res.status(500).json({
            success: false,
            message: "Error verifying payment",
        });
        return;
    }
};
