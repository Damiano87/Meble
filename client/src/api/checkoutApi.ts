import apiRequest from "@/api/apiRequest";
import { type CartItemType } from "@/utils/types";

type CheckoutData = {
  cartItems: CartItemType[];
};

// create checkout session function
export const createCheckoutSession = async (data: CheckoutData) => {
  const response = await apiRequest.post(
    "/stripe/api/create-checkout-session",
    data
  );
  return response.data;
};
