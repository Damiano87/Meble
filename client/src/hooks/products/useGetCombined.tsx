import { createProductsApi } from "@/api/products/productsApi";
import { useQuery } from "@tanstack/react-query";

export const useGetCombined = () => {
  const { fetchCombinedApi } = createProductsApi();

  const { data, isPending, error } = useQuery({
    queryKey: ["combined"],
    queryFn: fetchCombinedApi,
  });

  return {
    products: data?.products,
    trendyProducts: data?.trendyProducts,
    isPending,
    error,
  };
};
