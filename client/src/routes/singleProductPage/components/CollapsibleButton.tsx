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
      className="flex items-center justify-between w-full border-t-2 py-2"
    >
      <h3 className="text-[.9rem] md:text-[1.3rem] font-semibold">{title}</h3>
      {isOpen ? (
        <HiOutlineMinus className="text-[1.3rem] md:text-[1.7rem]" />
      ) : (
        <GoPlus className="text-[1.3rem] md:text-[1.7rem]" />
      )}
    </button>
  );
};

export default CollapsibleButton;
