import { MdOutlineDashboard } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { Link, useNavigate } from "react-router";
import useLogout from "@/hooks/useLogout";

const Logout = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="absolute hidden group-hover:block right-0 bg-white px-1 py-1 rounded-md shadow-md">
      <Link
        to={"/dashboard"}
        className="w-full flex items-center justify-between gap-4 px-3 py-1 hover:bg-slate-100"
      >
        <span className="text-nowrap">Dashboard</span>
        <MdOutlineDashboard size={25} />
      </Link>

      <button
        className="w-full flex items-center justify-between gap-4 px-3 py-1 hover:bg-slate-100"
        onClick={logoutUser}
      >
        <span className="text-nowrap">Wyloguj się</span>
        <CiLogin size={25} />
      </button>
    </div>
  );
};
export default Logout;
