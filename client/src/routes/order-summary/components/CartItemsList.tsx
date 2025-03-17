import { useGetCartItems } from "@/hooks/cart/useGetCartItems";
import CartItemForOrder from "./CartItemForOrder";

const CartItemsList = () => {
  const { data: cartItems } = useGetCartItems();

  return (
    <div className="space-y-3 flex-1">
      {cartItems?.map((item) => {
        return (
          <CartItemForOrder
            key={item.id}
            cartProduct={item.product}
            quantity={item.quantity}
          />
        );
      })}
    </div>
  );
};
export default CartItemsList;
