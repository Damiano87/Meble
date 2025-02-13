import { Link, useLocation } from "react-router";
import { Button } from "../ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import { useCart } from "@/hooks/useCart";
import { useOverlay } from "@/hooks/useOverlay";

const GoToCartRoute = () => {
  const { setOpenCart } = useCart();
  const { setIsOverlayVisible } = useOverlay();
  const isCartPage = useLocation().pathname === "/cart";

  // close aside cart on click and hide overlay
  const goToCart = () => {
    setOpenCart(false);
    setIsOverlayVisible(false);
  };

  if (isCartPage) return null;

  return (
    <Button
      asChild
      variant={"secondary"}
      className="text-amber-600 flex items-center gap-2 hover:text-amber-800 active:text-red-900 p-0 mt-1 w-fit"
      onClick={goToCart}
    >
      <Link to={"/cart"}>
        <span>Idź do strony koszyka</span>
        <FaArrowRightLong />
      </Link>
    </Button>
  );
};
export default GoToCartRoute;
