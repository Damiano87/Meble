import { useContext, useDebugValue } from "react";
import AuthContext from "../../context/authContext";

export const useToken = () => {
  const { token } = useContext(AuthContext);
  useDebugValue(token, (token) => (token ? "Logged In" : "Logged Out"));

  return useContext(AuthContext);
};
