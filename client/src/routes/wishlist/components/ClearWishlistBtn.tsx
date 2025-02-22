import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/wishlist/useWishList";

const ClearWishlistBtn = () => {
  const { clearWishlist } = useWishlist();

  return (
    <Button
      variant={"secondary"}
      className="border border-red-900 text-red-900 hover:bg-red-900 hover:text-white duration-500 rounded-sm"
      onClick={() => clearWishlist()}
    >
      Wyczyść listę życzeń
    </Button>
  );
};
export default ClearWishlistBtn;
