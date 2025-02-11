import { useGetCartItems } from "@/hooks/useGetCartItems";
import { Badge } from "../ui/badge";
import { useMemo } from "react";

const CartBadge = () => {
  const { data: cartItems, isPending } = useGetCartItems();

  // get cart items quantity
  const cartItemsQuantity = useMemo(() => {
    if (!cartItems) return 0;
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  if (isPending) return null;

  if (!cartItemsQuantity) return null;

  return (
    <Badge
      variant="destructive"
      className="absolute bottom-3 left-3 aspect-square rounded-full text-[.7rem] hover:bg-destructive"
    >
      {cartItemsQuantity}
    </Badge>
  );
};

export default CartBadge;
