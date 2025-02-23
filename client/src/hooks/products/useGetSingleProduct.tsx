import { createProductsApi } from "@/api/products/productsApi";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleProduct = (id: string | undefined) => {
  const { fetchSingleProductApi } = createProductsApi();
  const { data: product, isPending } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: () => fetchSingleProductApi(id),
    enabled: !!id,
  });

  return { product, isLoadingProduct: isPending };
};
