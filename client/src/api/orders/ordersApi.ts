import { AxiosInstance } from "axios";
import { ENDPOINTS } from "../endpoints";

export const createOrderApi = (axiosPrivate: AxiosInstance) => ({
  //   get orders api
  getOrderApi: async () => {
    const response = await axiosPrivate.get(ENDPOINTS.ORDERS.GET_ORDERS);
    return response.data;
  },

  // create order api
  addOrderApi: async () => {
    const response = await axiosPrivate.post(ENDPOINTS.ORDERS.CREATE_ORDER);
    return response.data.data;
  },
});
