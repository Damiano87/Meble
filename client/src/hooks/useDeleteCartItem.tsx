import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

export const useDeleteCartItem = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (cartItemId: string) =>
      axiosPrivate.delete(`/cart/remove-from-cart/${cartItemId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    },
  });

  return mutate;
};
