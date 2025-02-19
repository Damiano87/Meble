import { AxiosInstance } from "axios";
import { CartItemType } from "@/utils/types";
import { ENDPOINTS } from "../endpoints";

export const createCartApi = (axiosPrivate: AxiosInstance) => ({
  // get cart items
  getCartItemsApi: async (): Promise<CartItemType[]> => {
    const response = await axiosPrivate.get(ENDPOINTS.CART.GET);
    return response.data;
  },

  // add item to cart
  addToCartApi: async (productId: string, quantity: number) => {
    const response = await axiosPrivate.post(ENDPOINTS.CART.ADD(productId), {
      quantity,
    });
    return response.data;
  },

  // update cart item quantity
  updateCartItemQuantityApi: async ({
    newQuantity,
    cartItemId,
  }: {
    newQuantity: number;
    cartItemId: string;
  }) =>
    await axiosPrivate.patch(ENDPOINTS.CART.PATCH(cartItemId), {
      newQuantity,
    }),

  // delete all cart items
  deleteAllCartItemsApi: async () =>
    await axiosPrivate.delete(ENDPOINTS.CART.DELETEALL),

  // delete cart item by id
  deleteCartItemByIdApi: async (cartItemId: string) =>
    await axiosPrivate.delete(ENDPOINTS.CART.DELETE(cartItemId)),
});
