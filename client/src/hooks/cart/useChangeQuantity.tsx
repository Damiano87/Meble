import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../auth/useAxiosPrivate";
import { useCartSync } from "@/context/cartSyncContext";
import { createCartApi } from "@/api/cart/cartApi";

export const useChangeQuantity = () => {
  const axiosPrivate = useAxiosPrivate();
  const { updateCartItemQuantityApi } = createCartApi(axiosPrivate);
  const { triggerSync } = useCartSync();

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateCartItemQuantityApi,
    onSuccess: () => {
      triggerSync();
    },
    onError: (error) => {
      console.error("Error updating quantity:", error);
    },
  });

  return { mutate, isPending, error };
};
