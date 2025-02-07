import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

export const useChangeQuantity = (cartItemId: string) => {
  const axiosPrivate = useAxiosPrivate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (newQuantity: number) =>
      await axiosPrivate.patch(`/cart/update-quantity/${cartItemId}`, {
        quantity: newQuantity,
      }),
  });

  return { mutate, isPending, error };
};
