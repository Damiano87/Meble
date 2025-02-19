import { useContext } from "react";
import AuthContext from "@/context/authContext";
import { createAuthApi } from "@/api/auth/authApi";

const useRefreshToken = () => {
  const { setToken } = useContext(AuthContext);
  const { refreshTokenApi } = createAuthApi();

  const refresh = async () => {
    try {
      const response = await refreshTokenApi();
      setToken(response);
    } catch (error) {
      console.error("Nie udało się odświeżyć access tokena", error);
      setToken(null);
    }
  };
  return refresh;
};

export default useRefreshToken;
