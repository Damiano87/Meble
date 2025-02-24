import apiRequest from "../apiRequest";
import { type Product } from "@/utils/types";
import { type ProductsParams } from "./productsTypes";
import { ENDPOINTS } from "../endpoints";

export const createProductsApi = () => ({
  fetchProductsApi: async (params: ProductsParams): Promise<Product[]> => {
    const { data } = await apiRequest(ENDPOINTS.PRODUCTS.GET_ALL, { params });
    return data;
  },

  fetchCombinedApi: async () => {
    const [topEight, trendyProducts] = await Promise.all([
      apiRequest(ENDPOINTS.PRODUCTS.TOP_EIGHT),
      apiRequest(ENDPOINTS.PRODUCTS.TRENDY),
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

    const { data } = await apiRequest(ENDPOINTS.PRODUCTS.GET_BY_ID(id));
    return data;
  },
});
