import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import { useAuth } from "./useAuth";
import { type CartItemType } from "@/utils/types";

export const useChangeQuantity = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { username } = useAuth();

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
    onSuccess: (_, variables) => {
      // update the cart items in the cache
      queryClient.setQueryData(
        ["cart-items", username],
        (oldData: CartItemType[] | undefined) => {
          if (!oldData) return oldData;
          return oldData.map((item) =>
            item.id === variables.cartItemId
              ? { ...item, quantity: variables.newQuantity }
              : item
          );
        }
      );
    },
    onError: (error) => {
      console.error("Error updating quantity:", error);
    },
  });

  return { mutate, isPending, error };
};
