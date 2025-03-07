import { User } from "@/utils/types";
import { AxiosInstance } from "axios";
import { ENDPOINTS } from "../endpoints";

export const createUsersApi = (axiosPrivate: AxiosInstance) => ({
  getUserApi: async () => {
    const response = await axiosPrivate.get(ENDPOINTS.USERS.GET_USER);
    return response.data;
  },

  updateUserInfoForDeliveryApi: async (userInfo: User) => {
    const response = await axiosPrivate.patch(ENDPOINTS.USERS.PATCH, userInfo);
    return response.data;
  },

  updateUserPasswordApi: async (userPassword: string) => {
    const response = await axiosPrivate.patch(ENDPOINTS.USERS.PATCH_PASSWORD, {
      userPassword,
    });
    return response.data;
  },
});
