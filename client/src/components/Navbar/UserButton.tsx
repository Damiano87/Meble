import { TbUser } from "react-icons/tb";
import { Link } from "react-router";
import { LuClipboard } from "react-icons/lu";
import { IoMdLogIn } from "react-icons/io";

const UserButton = () => {
  return (
    <div className="relative group">
      <TbUser size={25} />
      <div className="hidden group-hover:block absolute rounded-md bg-white shadow-md w-[10rem] text-sm right-0 translate-x-[50%] text-black">
        {/* register */}
        <Link
          to={"/register"}
          className="flex items-center justify-between hover:bg-neutral-100 transition rounded-md p-2"
        >
          <span className="text-[1rem]">Zarejestruj się</span>
          <LuClipboard size={17} />
        </Link>
        {/* login */}
        <Link
          to={"/login"}
          className="flex items-center justify-between hover:bg-neutral-100 transition rounded-md p-2"
        >
          <span className="text-[1rem]">Zaloguj się</span>
          <IoMdLogIn size={19} />
        </Link>
      </div>
    </div>
  );
};

export default UserButton;
