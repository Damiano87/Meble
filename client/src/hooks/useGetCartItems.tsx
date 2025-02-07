import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import { type CartItemType } from "@/utils/types";

export const useGetCartItems = () => {
  const axiosPrivate = useAxiosPrivate();

  const getCartItems = async (): Promise<CartItemType[]> => {
    const response = await axiosPrivate.get("/cart/cart-items");
    return response.data;
  };

  const { data, isPending, error } = useQuery<CartItemType[]>({
    queryKey: ["cart-items"],
    queryFn: getCartItems,
  });

  return { data, isPending, error };
};
