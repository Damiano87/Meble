import AuthContext from "@/context/authContext";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useContext, useDebugValue } from "react";

interface MyJwtPayload extends JwtPayload {
  UserInfo: {
    username: string;
    email: string;
    roles: string[];
    isActive: boolean;
  };
}

export const useAuth = () => {
  const { token, persist } = useContext(AuthContext);

  useDebugValue(token, (token) => (token ? "Logged In" : "Logged Out"));

  if (token) {
    try {
      const { UserInfo } = jwtDecode<MyJwtPayload>(token);
      const { username, email, roles, isActive } = UserInfo;
      const isAdmin = roles.includes("Admin");

      return { username, email, roles, isActive, isAdmin, persist };
    } catch (error) {
      console.error("Invalid token", error);
      return {
        username: "",
        email: "",
        roles: [],
        isActive: false,
        isAdmin: false,
      };
    }
  }

  return {
    username: "",
    email: "",
    roles: [],
    isActive: false,
    isAdmin: false,
    persist,
  };
};
