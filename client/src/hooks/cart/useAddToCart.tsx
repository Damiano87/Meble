import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../auth/useAxiosPrivate";
import { useCartSync } from "@/context/cartSyncContext";
import { createCartApi } from "@/api/cart/cartApi";

interface AxiosErrorResponse extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

type UseAddToCartProps = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useAddToCart = ({
  onSuccess,
  onError,
}: UseAddToCartProps = {}) => {
  const axiosPrivate = useAxiosPrivate();
  const { addToCartApi } = createCartApi(axiosPrivate);
  const { triggerSync } = useCartSync();

  const { mutate, isPending, error } = useMutation<
    void,
    AxiosErrorResponse,
    { productId: string; quantity: number }
  >({
    mutationFn: ({ productId, quantity }) => addToCartApi(productId, quantity),
    onSuccess: () => {
      onSuccess?.();
      triggerSync();
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ?? "Add to cart failed";
      console.error(errorMessage);
      onError?.();
      return errorMessage;
    },
  });

  return { mutate, isPending, error };
};
