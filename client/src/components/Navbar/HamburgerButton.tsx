import { useOverlay } from "@/hooks/other/useOverlay";
import { GiHamburgerMenu } from "react-icons/gi";

const HamburgerButton = ({
  setIsVisible,
}: {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setIsOverlayVisible } = useOverlay();

  return (
    <button
      className="md:hidden cursor-pointer hover:scale-110 transition duration-300"
      onClick={() => {
        setIsVisible(true);
        setIsOverlayVisible(true);
      }}
    >
      <GiHamburgerMenu size={25} />
    </button>
  );
};
export default HamburgerButton;
