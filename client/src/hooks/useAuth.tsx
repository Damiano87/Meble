import { useToken } from "./useToken";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface MyJwtPayload extends JwtPayload {
  UserInfo: {
    username: string;
    roles: string[];
    isActive: boolean;
  };
}

export const useAuth = () => {
  const { token } = useToken();
  let isAdmin = false;
  const myToken = token;

  if (myToken) {
    const { username, roles, isActive } =
      jwtDecode<MyJwtPayload>(myToken).UserInfo;

    isAdmin = roles.includes("Admin");

    return { username, roles, isActive, isAdmin };
  }

  return { username: "", roles: [], isActive: false, isAdmin };
};
