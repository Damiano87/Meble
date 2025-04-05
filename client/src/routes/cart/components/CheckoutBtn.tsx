import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/cart/useCart";
import { useOverlay } from "@/hooks/other/useOverlay";
import { useGetUser } from "@/hooks/users/useGetUser";
import { useNavigate } from "react-router";

const CheckoutBtn = () => {
  const { user } = useGetUser();
  const { setOpenCart } = useCart();
  const { setIsOverlayVisible } = useOverlay();
  const navigate = useNavigate();

  // if user exists go to order summary, if not go to checkout form
  const handleCheckout = () => {
    if (
      user.country &&
      user.city &&
      user.street &&
      user.apartmentNr &&
      user.postalCode
    ) {
      navigate("/order-summary");
    } else {
      navigate("/shipping-address-form");
    }
    setOpenCart(false);
    setIsOverlayVisible(false);
  };

  return (
    <Button
      className="bg-red-900 text-white hover:text-red-900 hover:border-red-900 border duration-500 px-7"
      onClick={handleCheckout}
    >
      Do kasy
    </Button>
  );
};
export default CheckoutBtn;
