import { useGetCartItems } from "@/hooks/cart/useGetCartItems";
import { Badge } from "../ui/badge";
import { useMemo } from "react";
import { useAuth } from "@/hooks/auth/useAuth";

const CartBadge = () => {
  const { username } = useAuth(); // Ensure user is authenticated
  const { data: cartItems, isPending } = useGetCartItems({
    enabled: !!username, // Only fetch cart items if user is authenticated
  });

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
      className="absolute bottom-3 left-3 flex items-center justify-center w-6 aspect-square rounded-full text-[.8rem] hover:bg-destructive"
    >
      {cartItemsQuantity}
    </Badge>
  );
};

export default CartBadge;
