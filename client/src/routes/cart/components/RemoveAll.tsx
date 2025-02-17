import { CartItemType } from "@/utils/types";
import CheckoutBtn from "./CheckoutBtn";
import RemoveBtn from "./RemoveBtn";

type RemoveAllProps = {
  cartItems?: CartItemType[];
  totalPrice: number;
};

const Checkout = ({ cartItems, totalPrice }: RemoveAllProps) => {
  return (
    <div className="py-8 flex justify-between">
      {/* remove all items button  */}
      <RemoveBtn />
      {/* checkout button */}
      <CheckoutBtn cartItems={cartItems} totalPrice={totalPrice} />
    </div>
  );
};
export default Checkout;
