import { useContext } from "react";
import apiRequest from "../api/apiRequest";
import AuthContext from "@/context/authContext";

const useRefreshToken = () => {
  const { setToken } = useContext(AuthContext);

  const refresh = async () => {
    try {
      const response = await apiRequest.get("/auth/refresh", {
        withCredentials: true,
      });

      setToken(response?.data?.accessToken);
      return response?.data?.accessToken;
    } catch (error) {
      console.error("Nie udało się odświeżyć access tokena", error);
      setToken(null);
    }
  };
  return refresh;
};

export default useRefreshToken;
