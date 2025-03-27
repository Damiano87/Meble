import { createOrderApi } from "@/api/orders/ordersApi";
import useAxiosPrivate from "../auth/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderDetails = (orderId?: string) => {
  const axiosPrivate = useAxiosPrivate();
  const { getOrderDetailsApi } = createOrderApi(axiosPrivate);

  const {
    data: orderDetails,
    isPending: isFetchingOrderDetails,
    error,
  } = useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: () => getOrderDetailsApi(orderId),
    enabled: !!orderId,
  });

  return { orderDetails, isFetchingOrderDetails, error };
};
