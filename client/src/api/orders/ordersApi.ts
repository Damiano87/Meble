import { AxiosInstance } from "axios";
import { ENDPOINTS } from "../endpoints";

export const createOrderApi = (axiosPrivate: AxiosInstance) => ({
  //   get order api
  getUserOrdersApi: async (
    status?: string,
    sort?: string,
    price?: string,
    productName?: string
  ) => {
    const response = await axiosPrivate.get(ENDPOINTS.ORDERS.GET_ORDERS, {
      params: { status, sort, price, productName },
    });
    return response.data.data;
  },

  //   get order api
  getOrderDetailsApi: async (orderId?: string) => {
    const response = await axiosPrivate.get(
      ENDPOINTS.ORDERS.GET_ORDER(orderId)
    );
    return response.data.data;
  },

  // create order api
  addOrderApi: async () => {
    const response = await axiosPrivate.post(ENDPOINTS.ORDERS.CREATE_ORDER);
    return response.data.data;
  },
});
