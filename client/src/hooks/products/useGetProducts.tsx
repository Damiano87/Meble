import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { type ProductsParams } from "@/api/products/productsTypes";
import { type Product } from "@/utils/types";
import { createProductsApi } from "@/api/products/productsApi";

export const useProducts = (
  params: ProductsParams,
  options?: Omit<
    UseQueryOptions<Product[], Error, Product[]>,
    "queryKey" | "queryFn"
  >
) => {
  const { fetchProductsApi } = createProductsApi();

  const {
    data: products,
    isPending,
    error,
  } = useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProductsApi(params),
    staleTime: 5 * 60 * 1000,
    ...options,
  });

  return { products, isPending, error };
};
