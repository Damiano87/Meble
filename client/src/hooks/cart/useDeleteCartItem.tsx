import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../auth/useAxiosPrivate";
import { createCartApi } from "@/api/cart/cartApi";

export const useDeleteCartItem = () => {
  const axiosPrivate = useAxiosPrivate();
  const { deleteCartItemByIdApi } = createCartApi(axiosPrivate);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteCartItemByIdApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    },
  });

  return mutate;
};
