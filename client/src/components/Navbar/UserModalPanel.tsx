import { CiUser } from "react-icons/ci";
import { TbFolderHeart } from "react-icons/tb";
import { Link } from "react-router";
import Logout from "./Logout";

const UserModalPanel = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <div className="space-y-4 mt-4">
      <Link
        to={"my-data"}
        className="flex items-center gap-4 border-b-2 pb-2"
        onClick={handleClose}
      >
        <CiUser size={30} />
        <span className="text-[1.2rem] font-medium">Moje dane</span>
      </Link>
      <Link
        to={"/person_orders"}
        onClick={handleClose}
        className="flex items-center gap-4 border-b-2 pb-2"
      >
        <TbFolderHeart size={30} />
        <span className="text-[1.2rem] font-medium">Moje zamówienia</span>
      </Link>
      <Logout />
    </div>
  );
};
export default UserModalPanel;
