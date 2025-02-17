import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  const { cartItems } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // subtotal of the cart items
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    // free shipping if subtotal is above threshold
    const FREE_SHIPPING_THRESHOLD = 40000;
    const SHIPPING_COST = 1599;
    const isEligibleForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
    const shippingCost = isEligibleForFreeShipping ? 0 : SHIPPING_COST;

    // discount based on subtotal
    const discountPercentage =
      subtotal >= 50000 ? 10 : subtotal >= 30000 ? 5 : 0;

    // create a coupon for the discount if discountPercentage > 0
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
        ...cartItems.map((item) => ({
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
      mode: "payment",
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
      discounts: discountId ? [{ coupon: discountId }] : [],
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { handler };
