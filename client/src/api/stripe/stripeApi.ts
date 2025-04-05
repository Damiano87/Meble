import apiRequest from "@/api/apiRequest";
import { ENDPOINTS } from "../endpoints";
import { AxiosInstance } from "axios";

type OrderId = {
  orderId: string;
};

export const createStripeApi = (axiosPrivate: AxiosInstance) => ({
  // create checkout session function
  checkoutSessionApi: async (orderId: OrderId) => {
    const response = await axiosPrivate.post(
      ENDPOINTS.STRIPE.CREATE_CHECKOUT_SESSION,
      orderId
    );
    return response.data;
  },

  // function for verifying payment status
  verifyPaymentApi: async (sessionId: string | null) => {
    const { data } = await apiRequest.get(ENDPOINTS.STRIPE.VERIFY_PAYMENT, {
      params: { session_id: sessionId },
    });

    return data;
  },
});
