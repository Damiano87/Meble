import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router";
import useLogout from "@/hooks/auth/useLogout";
import { Button } from "../ui/button";

const Logout = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <Button
      variant={"secondary"}
      className="flex items-center gap-4 text-[1.2rem] text-red-900 hover:text-red-600 px-3 [&_svg]:size-7"
      onClick={logoutUser}
    >
      <span className="text-nowrap">Wyloguj się</span>
      <CiLogin className="mt-1" />
    </Button>
  );
};
export default Logout;
