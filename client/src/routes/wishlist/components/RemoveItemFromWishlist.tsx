import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/wishlist/useWishList";
import { TfiClose } from "react-icons/tfi";

const RemoveItemFromWishlist = ({ wishItemId }: { wishItemId: string }) => {
  const { removeFromWishlist } = useWishlist();

  return (
    <Button
      className="cursor-pointer outline-none border-none bg-transparent shadow-none p-0"
      title="Usuń z listy życzeń"
      onClick={() => removeFromWishlist(wishItemId)}
    >
      <TfiClose size={20} color="black" />
    </Button>
  );
};
export default RemoveItemFromWishlist;
