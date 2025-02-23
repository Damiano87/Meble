import apiRequest from "../apiRequest";
import { type Product } from "@/utils/types";
import { type ProductsParams } from "./productsTypes";

export const createProductsApi = () => ({
  fetchProductsApi: async (params: ProductsParams): Promise<Product[]> => {
    const { data } = await apiRequest("/products", { params });
    return data;
  },

  fetchCombinedApi: async () => {
    const [topEight, trendyProducts] = await Promise.all([
      apiRequest("/products/top-eight"),
      apiRequest("/products/trendy"),
    ]);
    return {
      products: topEight.data,
      trendyProducts: trendyProducts.data,
    };
  },

  fetchSingleProductApi: async (id: string | undefined): Promise<Product> => {
    if (!id) {
      throw new Error("Product ID is required");
    }

    const { data } = await apiRequest(`/products/${id}`);
    return data;
  },
});
