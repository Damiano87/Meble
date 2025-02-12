import CartItem from "@/routes/cart/components/CartItem";
import { CartItemType } from "@/utils/types";

const AsideCartList = ({
  cartItems,
}: {
  cartItems: CartItemType[] | undefined;
}) => {
  const isAsideCart = true;
  return (
    <div className="space-y-3 mt-7">
      {cartItems?.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          isAsideCart={isAsideCart}
          className="border-2 border-red-900 bg-white"
          imageClassName="w-14"
          stockClassName="hidden"
        />
      ))}
    </div>
  );
};
export default AsideCartList;
