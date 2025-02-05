import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

interface AxiosErrorResponse extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useAddToCart = () => {
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
    mutationFn: (params: { productId: string; quantity: number }) =>
      addToCart(params.productId, params.quantity),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
      return error.response?.data?.message ?? "Login Failed";
    },
  });

  return { mutate, isPending, error };
};
