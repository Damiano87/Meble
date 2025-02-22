import { useWishlist } from "@/hooks/wishlist/useWishList";
import { Badge } from "../ui/badge";

const WishlistBadge = () => {
  const { wishlist } = useWishlist();

  return (
    <Badge
      variant="destructive"
      className="absolute bottom-3 left-3 flex items-center justify-center w-6 aspect-square rounded-full text-[.8rem] hover:bg-destructive"
    >
      {wishlist?.length || 0}
    </Badge>
  );
};
export default WishlistBadge;
