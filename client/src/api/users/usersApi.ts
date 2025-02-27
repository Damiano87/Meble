import { User } from "@/utils/types";
import { AxiosInstance } from "axios";
import { ENDPOINTS } from "../endpoints";

export const createUsersApi = (axiosPrivate: AxiosInstance) => ({
  // create checkout session function
  updateUserInfoForDeliveryApi: async (userInfo: User) => {
    const response = await axiosPrivate.patch(ENDPOINTS.USERS.PATCH, userInfo);
    return response.data;
  },
});
