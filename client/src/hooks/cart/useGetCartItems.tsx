import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../auth/useAxiosPrivate";
import { type CartItemType } from "@/utils/types";
import { useAuth } from "../auth/useAuth";
import { useCartSync } from "@/context/cartSyncContext";
import { createCartApi } from "@/api/cart/cartApi";

export const useGetCartItems = (options?: { enabled?: boolean }) => {
  const axiosPrivate = useAxiosPrivate();
  const { getCartItemsApi } = createCartApi(axiosPrivate);
  const { username } = useAuth();
  const { syncFlag } = useCartSync();

  const { data, isPending, error } = useQuery<CartItemType[]>({
    queryKey: ["cart-items", username, syncFlag],
    queryFn: getCartItemsApi,
    enabled: options?.enabled ?? true,
  });

  return { data, isPending, error };
};
