import apiRequest from "@/api/apiRequest";
import { useToken } from "./useToken";

const useLogout = () => {
  const { setToken } = useToken();

  const logout = async () => {
    setToken(null);

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
