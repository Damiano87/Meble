import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

export const useChangeQuantity = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    },
    onError: (error) => {
      console.error("Error updating quantity:", error);
    },
  });

  return { mutate, isPending, error };
};
