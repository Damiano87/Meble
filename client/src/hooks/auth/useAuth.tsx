import AuthContext from "@/context/authContext";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useContext, useDebugValue } from "react";

interface MyJwtPayload extends JwtPayload {
  UserInfo: {
    id: string;
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
      const { id, username, email, roles, isActive } = UserInfo;
      const isAdmin = roles.includes("Admin");

      return { id, username, email, roles, isActive, isAdmin, persist };
    } catch (error) {
      console.error("Invalid token", error);
      return {
        id: "",
        username: "",
        email: "",
        roles: [],
        isActive: false,
        isAdmin: false,
      };
    }
  }

  return {
    id: "",
    username: "",
    email: "",
    roles: [],
    isActive: false,
    isAdmin: false,
    persist,
  };
};
