import { IoMdClose } from "react-icons/io";
import { Link } from "react-router";
import { useOverlay } from "../../hooks/useOverlay";

type SidebarProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ isVisible, setIsVisible }: SidebarProps) => {
  const { setIsOverlayVisible } = useOverlay();

  // close sidebar
  const closeSidebar = () => {
    setIsVisible(false);
    setIsOverlayVisible(false);
  };

  return (
    <aside
      className={`${
        isVisible ? "translate-x-0" : "translate-x-full"
      } fixed top-0 right-0 w-64 h-screen z-[10] bg-white shadow-xl p-4 transition duration-300`}
    >
      <div className="flex justify-end">
        <button
          className="cursor-pointer hover:scale-110 transition-all duration-300"
          onClick={closeSidebar}
        >
          <IoMdClose size={35} color="#FFD700" />
        </button>
      </div>
      <div className="mt-10">
        <Link to={"/categories"} onClick={closeSidebar}>
          <p className="uppercase font-semibold cursor-pointer hover:translate-x-1 transition duration-700 mb-3">
            kategorie
          </p>
        </Link>
        <Link to={"/popularne"} onClick={closeSidebar}>
          <p className="uppercase font-semibold cursor-pointer hover:translate-x-1 transition duration-700">
            popularne
          </p>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
