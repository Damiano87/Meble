import { AxiosInstance } from "axios";
import { WishlistItem } from "../../utils/types";
import { ENDPOINTS } from "../endpoints";

export const createWishlistApi = (axiosPrivate: AxiosInstance) => ({
  getWishlistApi: async (): Promise<WishlistItem[]> => {
    console.log("Executing getWishlist API call...");
    const { data } = await axiosPrivate.get(ENDPOINTS.WISHLIST.GET);
    return data.data.items;
  },

  addToWishlistApi: async (productId: string): Promise<WishlistItem> => {
    console.log("Adding to wishlist...");
    const { data } = await axiosPrivate.post(ENDPOINTS.WISHLIST.ADD, {
      productId,
    });
    return data;
  },

  removeFromWishlistApi: async (productId: string): Promise<void> => {
    console.log("Deleting from wishlist...");
    await axiosPrivate.delete(ENDPOINTS.WISHLIST.DELETE, {
      data: { productId },
    });
  },

  syncLocalWishlistApi: async (
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
