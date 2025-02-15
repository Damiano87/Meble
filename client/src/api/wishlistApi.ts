import { AxiosInstance } from "axios";
import { WishlistItem } from "../utils/types";
import apiRequest from "../api/apiRequest";

export const createWishlistApi = (axiosPrivate: AxiosInstance) => ({
  getWishlist: async (): Promise<WishlistItem[]> => {
    console.log("Executing getWishlist API call...");
    const { data } = await apiRequest.get("/wishlist");
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
        axiosPrivate.post("/wishlist", { item });
      })
    );
  },
});
