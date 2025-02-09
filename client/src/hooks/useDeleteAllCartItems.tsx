import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

export const useDeleteAllCartItems = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => axiosPrivate.delete("/cart/remove-all"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    },
    onError: (error) => {
      console.error("Failed to delete cart items:", error);
    },
  });

  return { deleteAllCartItems: mutate, isDeleting: isPending };
};
