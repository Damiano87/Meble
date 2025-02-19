import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/stripe/useCheckout";
import { CartItemType } from "@/utils/types";

type CheckoutBtnProps = {
  cartItems?: CartItemType[];
};
const CheckoutBtn = ({ cartItems }: CheckoutBtnProps) => {
  const { checkout, isPending } = useCheckout();

  const handleCheckout = () => {
    checkout({
      cartItems: cartItems ? cartItems : [],
    });
  };

  return (
    <Button
      className="bg-red-900 text-white hover:text-red-900 hover:border-red-900 border duration-500 px-7"
      disabled={isPending}
      onClick={handleCheckout}
    >
      {isPending ? "Przetwarzanie..." : "Do kasy"}
    </Button>
  );
};
export default CheckoutBtn;
