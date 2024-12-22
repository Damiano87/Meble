import { useCart } from "@/hooks/useCart";
import { useOverlay } from "@/hooks/useOverlay";
import { FaShoppingCart } from "react-icons/fa";

const CartButton = ({ cartItems }: { cartItems: string[] }) => {
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
      {cartItems?.length ? (
        <div className="absolute -top-1 md:-top-2 -right-2 badge badge-primary badge-xs bg-red-600 text-white text-[0.7rem] h-[1.2rem] aspect-square">
          {cartItems.length}
        </div>
      ) : null}
    </button>
  );
};
export default CartButton;
