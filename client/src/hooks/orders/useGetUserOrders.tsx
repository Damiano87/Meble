import { createOrderApi } from "@/api/orders/ordersApi";
import useAxiosPrivate from "../auth/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export const useGetUserOrders = () => {
  const axiosPrivate = useAxiosPrivate();
  const { getUserOrdersApi } = createOrderApi(axiosPrivate);

  const {
    data: orders,
    isPending: isFetchingOrders,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getUserOrdersApi,
  });

  return { orders, isFetchingOrders, error };
};
