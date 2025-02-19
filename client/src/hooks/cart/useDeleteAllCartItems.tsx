import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../auth/useAxiosPrivate";
import { createCartApi } from "@/api/cart/cartApi";

export const useDeleteAllCartItems = () => {
  const axiosPrivate = useAxiosPrivate();
  const { deleteAllCartItemsApi } = createCartApi(axiosPrivate);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteAllCartItemsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    },
    onError: (error) => {
      console.error("Failed to delete cart items:", error);
    },
  });

  return { deleteAllCartItems: mutate, isDeleting: isPending };
};
