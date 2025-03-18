import { createOrderApi } from "@/api/orders/ordersApi";
import useAxiosPrivate from "../auth/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export const useCreateOrder = () => {
  const axiosPrivate = useAxiosPrivate();
  const { addOrderApi } = createOrderApi(axiosPrivate);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: addOrderApi,
    onSuccess: () => {
      console.log("Order created succesfully");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { createOrder: mutateAsync, isCreatingOrder: isPending };
};
