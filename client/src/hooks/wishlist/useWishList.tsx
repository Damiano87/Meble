import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createWishlistApi } from "@/api/wishlist/wishlistApi";
// import { useAuth } from "./useAuth";
// import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { type WishlistItem } from "@/utils/types";
import useAxiosPrivate from "../auth/useAxiosPrivate";
import { useAuth } from "../auth/useAuth";

export const useWishlist = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const {
    addToWishlistApi,
    getWishlistApi,
    removeFromWishlistApi,
    clearWishlistApi,
    sendWishlistToEmailApi,
  } = createWishlistApi(axiosPrivate);
  const { username } = useAuth();

  const WISHLIST_QUERY_KEY = ["wishlist", username];

  // main query for wishlist =========================================
  const {
    data: wishlist = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: WISHLIST_QUERY_KEY,
    queryFn: getWishlistApi,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    enabled: !!username,
  });

  // mutation for adding to wishlist =================================
  const addToWishlistMutation = useMutation({
    mutationFn: addToWishlistApi,
    onMutate: async () => {
      // cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: WISHLIST_QUERY_KEY });

      // snapshot the previous value
      const previousWishlist = queryClient.getQueryData(WISHLIST_QUERY_KEY);

      return { previousWishlist };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(WISHLIST_QUERY_KEY, context?.previousWishlist);
      toast.error("Nie udało się dodać produktu do listy życzeń");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
      toast.success("Produkt dodany do listy życzeń");
    },
  });

  // mutation for removing from wishlist =============================
  const removeFromWishlistMutation = useMutation({
    mutationFn: removeFromWishlistApi,
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: WISHLIST_QUERY_KEY });

      const previousWishlist = queryClient.getQueryData(WISHLIST_QUERY_KEY);

      // optimistic update
      queryClient.setQueryData(WISHLIST_QUERY_KEY, (old: WishlistItem[] = []) =>
        old.filter((item) => item.productId !== productId)
      );

      return { previousWishlist };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(WISHLIST_QUERY_KEY, context?.previousWishlist);
      toast.error("Nie udało się usunąć produktu z listy życzeń");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
      toast.success("Produkt usunięty z listy życzeń");
    },
  });

  // mutation for clearing wishlist ==================================
  const clearWishlistMutation = useMutation({
    mutationFn: clearWishlistApi,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: WISHLIST_QUERY_KEY });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
      toast.success("Lista życzeń jest pusta");
    },
    onError: () => {
      toast.error("Nie udało się wyczyścić listy");
    },
  });

  // mutation for sending user wishlist to email ====================================
  const sendWishlistMutation = useMutation({
    mutationFn: sendWishlistToEmailApi,
    onSuccess: () => {
      toast.success("Lista życzeń została wysłana na Twój email");
    },
    onError: () => {
      toast.error("Nie udało się wysłać listy życzeń");
    },
  });

  return {
    wishlist,
    isLoading,
    error,
    addToWishlist: addToWishlistMutation.mutate,
    removeFromWishlist: removeFromWishlistMutation.mutate,
    clearWishlist: clearWishlistMutation.mutate,
    sendWishlistToEmail: sendWishlistMutation.mutate,
    sendWishlistToEmailSuccess: sendWishlistMutation.isSuccess,
    sendingToEmail: sendWishlistMutation.isPending,
    isAddingToWishlist: addToWishlistMutation.isPending,
    isRemovingFromWishlist: removeFromWishlistMutation.isPending,
  };
};

// mutation for syncing local wishlist =============================
// const syncWishlistMutation = useMutation({
//   mutationFn: wishlistApi.syncLocalWishlist,
//   onSuccess: () => {
//     localStorage.removeItem(LOCAL_STORAGE_KEY);
//     queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
//     toast.success("Lista życzeń została zsynchronizowana");
//   },
//   onError: () => {
//     toast.error("Nie udało się zsynchronizować listy życzeń");
//   },
// });

// Sync local wishlist with server when user logs in
// useEffect(() => {
//   if (username) {
//     console.log("Executing syncing...");
//     const localWishlist = getLocalWishlist();
//     if (localWishlist.length > 0) {
//       syncWishlistMutation.mutate(localWishlist);
//     }
//   }
// }, [username]);
