import apiRequest from "@/api/apiRequest";
import { ENDPOINTS } from "../endpoints";
import { AxiosInstance } from "axios";

export const createStripeApi = (axiosPrivate: AxiosInstance) => ({
  // create checkout session function
  checkoutSessionApi: async () => {
    const response = await axiosPrivate.post(
      ENDPOINTS.STRIPE.CREATE_CHECKOUT_SESSION
    );
    console.log("Executing checkout api call...");
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
