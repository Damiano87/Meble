import apiRequest from "@/api/apiRequest";
import { useContext } from "react";
import AuthContext from "@/context/authContext";

const useLogout = () => {
  const { setToken, setPersist } = useContext(AuthContext);

  const logout = async () => {
    setToken(null);
    setPersist(false);
    localStorage.removeItem("persist");

    try {
      await apiRequest.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
