import { formatToPLN } from "@/utils/functions";
import { type WishlistItem } from "@/utils/types";

const TotalAmount = ({ wishlist }: { wishlist?: WishlistItem[] }) => {
  if (!wishlist) return null;

  // Calculate the total amount of the wishlist items
  const total = wishlist.reduce((acc, item) => acc + item.product.price, 0);
  return (
    <div className="flex justify-between font-semibold border-b-2 pb-5">
      <span>Kwota całkowita:</span>
      <span>{formatToPLN(total)}</span>
    </div>
  );
};
export default TotalAmount;
