import apiRequest from "@/api/apiRequest";
import {
  RegisterCredentials,
  LoginCredentials,
  LoginResponse,
} from "@/api/auth/authTypes";

export const createAuthApi = () => ({
  registerApi: async (credentials: RegisterCredentials) => {
    const response = await apiRequest.post(
      "/auth/register",
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
      "/auth/login",
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
      "/auth/logout",
      {},
      {
        withCredentials: true,
      }
    ),

  refreshTokenApi: async () => {
    const response = await apiRequest.get("/auth/refresh", {
      withCredentials: true,
    });

    return response?.data?.accessToken;
  },
});
