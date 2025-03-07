import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/stripe/useCheckout";
import { useGetUser } from "@/hooks/users/useGetUser";
import { CartItemType } from "@/utils/types";

type CheckoutBtnProps = {
  cartItems?: CartItemType[];
};

const CheckoutBtn = ({ cartItems }: CheckoutBtnProps) => {
  const { checkout, isPending } = useCheckout();
  const user = useGetUser();

  console.log(user);

  const handleCheckout = () => {
    if (
      user.country &&
      user.city &&
      user.street &&
      user.apartmentNr &&
      user.postalCode
    ) {
      checkout({
        cartItems: cartItems ? cartItems : [],
      });
    } else {
      console.log("user info doesnt exist");
    }
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
