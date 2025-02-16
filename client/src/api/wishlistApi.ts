import { AxiosInstance } from "axios";
import { WishlistItem } from "../utils/types";

export const createWishlistApi = (axiosPrivate: AxiosInstance) => ({
  getWishlist: async (): Promise<WishlistItem[]> => {
    console.log("Executing getWishlist API call...");
    const { data } = await axiosPrivate.get("/wishlist");
    return data.data.items;
  },

  addToWishlist: async (productId: string): Promise<WishlistItem> => {
    console.log("Adding to wishlist...");
    const { data } = await axiosPrivate.post("/wishlist", {
      productId,
    });
    return data;
  },

  removeFromWishlist: async (productId: string): Promise<void> => {
    console.log("Deleting from wishlist...");
    await axiosPrivate.delete("/wishlist", { data: { productId } });
  },

  syncLocalWishlist: async (
    items: Array<{
      productId: string;
    }>
  ): Promise<void> => {
    await Promise.all(
      items.map((item) => {
        console.log(item);
        return axiosPrivate.post("/wishlist", { productId: item });
      })
    );
  },
});
