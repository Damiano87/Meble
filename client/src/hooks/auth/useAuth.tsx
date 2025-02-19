import AuthContext from "@/context/authContext";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useContext, useDebugValue } from "react";

interface MyJwtPayload extends JwtPayload {
  UserInfo: {
    username: string;
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
      const { username, roles, isActive } = UserInfo;
      const isAdmin = roles.includes("Admin");

      return { username, roles, isActive, isAdmin, persist };
    } catch (error) {
      console.error("Invalid token", error);
      return { username: "", roles: [], isActive: false, isAdmin: false };
    }
  }

  return { username: "", roles: [], isActive: false, isAdmin: false, persist };
};
