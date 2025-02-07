import CartItem from "./CartItem";
import { type CartItemType } from "@/utils/types";

const CartList = ({ cartItems }: { cartItems: CartItemType[] | undefined }) => {
  return (
    <div className="border-b-2 pb-8 space-y-4">
      {cartItems?.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </div>
  );
};
export default CartList;
