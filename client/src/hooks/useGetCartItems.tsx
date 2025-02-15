import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import { type CartItemType } from "@/utils/types";
import { useAuth } from "./useAuth";
import { useCartSync } from "@/context/cartSyncContext";

export const useGetCartItems = (options?: { enabled?: boolean }) => {
  const axiosPrivate = useAxiosPrivate();
  const { username } = useAuth();
  const { syncFlag } = useCartSync();

  const getCartItems = async (): Promise<CartItemType[]> => {
    const response = await axiosPrivate.get("/cart/cart-items");
    return response.data;
  };

  const { data, isPending, error } = useQuery<CartItemType[]>({
    queryKey: ["cart-items", username, syncFlag],
    queryFn: getCartItems,
    enabled: options?.enabled ?? true,
  });

  return { data, isPending, error };
};
