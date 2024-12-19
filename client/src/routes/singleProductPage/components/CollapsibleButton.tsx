import { GoPlus } from "react-icons/go";
import { HiOutlineMinus } from "react-icons/hi2";

type CollapsibleButtonProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

const CollapsibleButton = ({
  isOpen,
  setIsOpen,
  title,
}: CollapsibleButtonProps) => {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`${
        !isOpen && "border-b-2"
      } flex items-center justify-between w-full border-t-2 py-2`}
    >
      <h3 className="text-[1.3rem] font-semibold">{title}</h3>
      {isOpen ? <HiOutlineMinus size={30} /> : <GoPlus size={30} />}
    </button>
  );
};

export default CollapsibleButton;
