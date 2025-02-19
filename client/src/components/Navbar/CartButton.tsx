import { useCart } from "@/hooks/cart/useCart";
import { useOverlay } from "@/hooks/other/useOverlay";
import { FaShoppingCart } from "react-icons/fa";
import CartBadge from "./CartBadge";

const CartButton = () => {
  const { setOpenCart } = useCart();
  const { setIsOverlayVisible } = useOverlay();

  return (
    <button
      onClick={() => {
        setOpenCart(true);
        setIsOverlayVisible(true);
      }}
      className="relative cursor-pointer hover:scale-110 transition duration-300"
    >
      <FaShoppingCart size={25} />
      <CartBadge />
    </button>
  );
};
export default CartButton;
