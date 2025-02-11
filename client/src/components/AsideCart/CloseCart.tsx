import { useCart } from "@/hooks/useCart";
import { useOverlay } from "@/hooks/useOverlay";
import { IoMdClose } from "react-icons/io";

const CloseCart = () => {
  const { setOpenCart } = useCart();
  const { setIsOverlayVisible } = useOverlay();
  return (
    <IoMdClose
      onClick={() => {
        setOpenCart(false);
        setIsOverlayVisible(false);
      }}
      className="text-[2rem] cursor-pointer hover:scale-110 transition-all duration-300"
    />
  );
};
export default CloseCart;
