import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import { useCartSync } from "@/context/cartSyncContext";

export const useChangeQuantity = () => {
  const axiosPrivate = useAxiosPrivate();
  const { triggerSync } = useCartSync();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({
      newQuantity,
      cartItemId,
    }: {
      newQuantity: number;
      cartItemId: string;
    }) =>
      await axiosPrivate.patch(`/cart/update-quantity/${cartItemId}`, {
        newQuantity,
      }),
    onSuccess: () => {
      triggerSync();
    },
    onError: (error) => {
      console.error("Error updating quantity:", error);
    },
  });

  return { mutate, isPending, error };
};
