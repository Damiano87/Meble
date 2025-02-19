import apiRequest from "@/api/apiRequest";
import { type CartItemType } from "@/utils/types";
import { ENDPOINTS } from "../endpoints";

type CheckoutData = {
  cartItems: CartItemType[];
};

// create checkout session function
export const createCheckoutSessionApi = async (data: CheckoutData) => {
  const response = await apiRequest.post(
    ENDPOINTS.STRIPE.CREATE_CHECKOUT_SESSION,
    data
  );
  return response.data;
};
