import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

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

  // get product ratings from api
  const addToCart = async (productId: string, quantity: number) => {
    const response = await axiosPrivate.post(`/cart/${productId}/add-to-cart`, {
      quantity,
    });
    return response.data;
  };

  const { mutate, isPending, error } = useMutation<
    void,
    AxiosErrorResponse,
    { productId: string; quantity: number }
  >({
    mutationFn: ({ productId, quantity }) => addToCart(productId, quantity),
    onSuccess: () => {
      onSuccess?.();
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
