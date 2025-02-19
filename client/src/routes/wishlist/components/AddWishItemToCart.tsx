import { Button } from "@/components/ui/button";
import { useAddToCart } from "@/hooks/cart/useAddToCart";

const AddWishItemToCart = ({ productId }: { productId: string }) => {
  const { mutate: addToCart } = useAddToCart();
  return (
    <Button
      variant={"secondary"}
      className="bg-red-900 text-white duration-500 hover:text-red-900 hover:bg-white border hover:border-red-900"
      onClick={() => addToCart({ productId, quantity: 1 })}
    >
      Do koszyka
    </Button>
  );
};
export default AddWishItemToCart;
