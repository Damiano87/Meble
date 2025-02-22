import apiRequest from "@/api/apiRequest";
import { type CartItemType } from "@/utils/types";
import { ENDPOINTS } from "../endpoints";

type CheckoutData = {
  cartItems: CartItemType[];
};

export const createStripeApi = () => ({
  // create checkout session function
  checkoutSessionApi: async (data: CheckoutData) => {
    const response = await apiRequest.post(
      ENDPOINTS.STRIPE.CREATE_CHECKOUT_SESSION,
      data
    );
    return response.data;
  },

  // function for verifying payment status
  verifyPaymentApi: async (sessionId: string | null) => {
    //   if (!sessionId) {
    //     throw new Error("Brak ID sesji płatności");
    //   }

    const { data } = await apiRequest.get(ENDPOINTS.STRIPE.VERIFY_PAYMENT, {
      params: { session_id: sessionId },
    });
    return data;
  },
});
