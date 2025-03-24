import { createOrderApi } from "@/api/orders/ordersApi";
import useAxiosPrivate from "../auth/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

type QueryParamsProps = {
  status?: string;
  sort?: string;
};

export const useGetUserOrders = (queryParams: QueryParamsProps) => {
  const axiosPrivate = useAxiosPrivate();
  const { getUserOrdersApi } = createOrderApi(axiosPrivate);

  const {
    data: orders,
    isPending: isFetchingOrders,
    error,
  } = useQuery({
    queryKey: ["orders", queryParams],
    queryFn: () => getUserOrdersApi(queryParams.status, queryParams.sort),
  });

  return { orders, isFetchingOrders, error };
};
