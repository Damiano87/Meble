import { useContext } from "react";
import AuthContext from "@/context/authContext";
import { useQueryClient } from "@tanstack/react-query";
import { createAuthApi } from "@/api/auth/authApi";

const useLogout = () => {
  const { setToken, setPersist } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { logoutApi } = createAuthApi();

  const logout = async () => {
    setToken(null);
    setPersist(false);
    localStorage.removeItem("persist");

    try {
      await logoutApi();

      // clear the cart items from the cache
      queryClient.removeQueries({ queryKey: ["cart-items"] });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
