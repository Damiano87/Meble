import { useWishlist } from "../hooks/wishlist/useWishList";
import { FaHeart } from "react-icons/fa";
import { type WishlistItem } from "@/utils/types";
import { Toaster } from "react-hot-toast";
interface WishlistButtonProps {
  productId: string;
}

export const WishlistButton = ({ productId }: WishlistButtonProps) => {
  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isLoading,
    isAddingToWishlist,
    isRemovingFromWishlist,
  } = useWishlist();

  const isInWishlist = wishlist.some(
    (item: WishlistItem) => item.productId === productId
  );
  const isProcessing = isAddingToWishlist || isRemovingFromWishlist;

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <FaHeart size={20} className="text-gray-300" />
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <button
        disabled={isProcessing}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (isInWishlist) {
            removeFromWishlist(productId);
          } else {
            addToWishlist(productId);
          }
        }}
        className={`
        absolute right-2 bottom-2 transition-all duration-200
        ${isProcessing ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}
        ${isInWishlist ? "text-red-500" : "text-gray-400"}
      `}
      >
        <FaHeart
          size={20}
          className={`${isProcessing ? "animate-pulse" : ""}`}
        />
      </button>
    </>
  );
};
