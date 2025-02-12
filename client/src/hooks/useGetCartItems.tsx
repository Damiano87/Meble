import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import { type CartItemType } from "@/utils/types";
import { useAuth } from "./useAuth";
import { useLocation } from "react-router";

export const useGetCartItems = (options?: { enabled?: boolean }) => {
  const axiosPrivate = useAxiosPrivate();
  const { username } = useAuth();
  const location = useLocation();

  const getCartItems = async (): Promise<CartItemType[]> => {
    console.log(
      `Executing API call to fetch cart items on location ${location.pathname}`
    );
    const response = await axiosPrivate.get("/cart/cart-items");
    return response.data;
  };

  const { data, isPending, error } = useQuery<CartItemType[]>({
    queryKey: ["cart-items", username],
    queryFn: getCartItems,
    enabled: options?.enabled ?? true,
  });

  return { data, isPending, error };
};
