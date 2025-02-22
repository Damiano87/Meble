import apiRequest from "@/api/apiRequest";
import {
  RegisterCredentials,
  LoginCredentials,
  LoginResponse,
} from "@/api/auth/authTypes";
import { ENDPOINTS } from "../endpoints";

export const createAuthApi = () => ({
  registerApi: async (credentials: RegisterCredentials) => {
    const response = await apiRequest.post(
      ENDPOINTS.AUTH.REGISTER,
      JSON.stringify(credentials),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  },

  loginApi: async (credentials: LoginCredentials) => {
    const response = await apiRequest.post<LoginResponse>(
      ENDPOINTS.AUTH.LOGIN,
      JSON.stringify(credentials),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  },

  logoutApi: async () =>
    await apiRequest.post(
      ENDPOINTS.AUTH.LOGOUT,
      {},
      {
        withCredentials: true,
      }
    ),

  refreshTokenApi: async () => {
    const response = await apiRequest.get(ENDPOINTS.AUTH.REFRESH, {
      withCredentials: true,
    });

    return response?.data?.accessToken;
  },
});
