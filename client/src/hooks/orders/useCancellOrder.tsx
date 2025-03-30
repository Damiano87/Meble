import { createOrderApi } from "@/api/orders/ordersApi";
import useAxiosPrivate from "../auth/useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCancellOrder = (orderId: string) => {
  const axiosPrivate = useAxiosPrivate();
  const { cancellOrderApi } = createOrderApi(axiosPrivate);
  const queryClient = useQueryClient();

  const {
    mutate: cancellOrder,
    isPending: isCancelling,
    error,
  } = useMutation({
    mutationFn: (orderId: string) => cancellOrderApi(orderId),
    onSuccess: () => {
      toast.success("Anulowano zamówienie");
      queryClient.invalidateQueries({ queryKey: ["orderDetails", orderId] });
    },
    onError: () => {
      toast.error("Nie udało się anulować zamówienia");
    },
  });

  return { cancellOrder, isCancelling, error };
};
