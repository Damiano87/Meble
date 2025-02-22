import { Button } from "@/components/ui/button";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { useWishlist } from "@/hooks/wishlist/useWishList";

const TransferAllToCart = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const { mutate: addToCart } = useAddToCart();

  // add all wish items to cart and clear wishlist
  const addWishItemsAndClear = async (): Promise<void> => {
    const addToCartPromises = wishlist.map((item) => {
      const { productId } = item;
      return addToCart({ productId, quantity: 1 });
    });

    await Promise.all(addToCartPromises);
    clearWishlist();
  };

  return (
    <Button
      variant={"secondary"}
      className="border border-red-900 text-white bg-red-900 hover:text-red-900 duration-500 rounded-sm"
      onClick={addWishItemsAndClear}
    >
      Przenieś wszystkie produkty do koszyka
    </Button>
  );
};
export default TransferAllToCart;
