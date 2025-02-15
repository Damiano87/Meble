import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createWishlistApi } from "@/api/wishlistApi";
import { useAuth } from "./useAuth";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { type WishlistItem } from "@/utils/types";
import useAxiosPrivate from "./useAxiosPrivate";

const WISHLIST_QUERY_KEY = ["wishlist"] as const;
const LOCAL_STORAGE_KEY = "wishlist";

export const useWishlist = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const wishlistApi = createWishlistApi(axiosPrivate);
  const { username } = useAuth();

  // helper functions for local storage
  const getLocalWishlist = () => {
    console.log("Getting local wishlist...");
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log(data);
    return data ? JSON.parse(data) : [];
  };

  const setLocalWishlist = (items: WishlistItem[]) => {
    console.log("Setting local wishlist...");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  };

  // main query for wishlist =========================================
  const {
    data: wishlist = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: WISHLIST_QUERY_KEY,
    queryFn: username ? wishlistApi.getWishlist : getLocalWishlist,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  // mutation for adding to wishlist =================================
  const addToWishlistMutation = useMutation({
    mutationFn: wishlistApi.addToWishlist,
    onMutate: async (productId: string) => {
      // cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: WISHLIST_QUERY_KEY });

      // snapshot the previous value
      const previousWishlist = queryClient.getQueryData(WISHLIST_QUERY_KEY);

      // optimistic update
      //   const optimisticItem = {
      //     productId,
      //   };

      //   queryClient.setQueryData(
      //     WISHLIST_QUERY_KEY,
      //     (old: WishlistItem[] = []) => [...old, optimisticItem]
      //   );

      if (!username) {
        setLocalWishlist([...wishlist, productId]);
      }

      return { previousWishlist };
    },
    onError: (err, newItem, context) => {
      queryClient.setQueryData(WISHLIST_QUERY_KEY, context?.previousWishlist);
      toast.error("Nie udało się dodać produktu do listy życzeń");
    },
    onSuccess: () => {
      toast.success("Produkt dodany do listy życzeń");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    },
  });

  // mutation for removing from wishlist =============================
  const removeFromWishlistMutation = useMutation({
    mutationFn: wishlistApi.removeFromWishlist,
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: WISHLIST_QUERY_KEY });

      const previousWishlist = queryClient.getQueryData(WISHLIST_QUERY_KEY);

      // optimistic update
      //   queryClient.setQueryData(WISHLIST_QUERY_KEY, (old: WishlistItem[] = []) =>
      //     old.filter((item) => item.productId !== productId)
      //   );

      if (!username) {
        setLocalWishlist(
          wishlist.filter((item: WishlistItem) => item.productId !== productId)
        );
      }

      return { previousWishlist };
    },
    onError: (err, productId, context) => {
      //   queryClient.setQueryData(WISHLIST_QUERY_KEY, context?.previousWishlist);
      toast.error("Nie udało się usunąć produktu z listy życzeń");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
      toast.success("Produkt usunięty z listy życzeń");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    },
  });

  // mutation for syncing local wishlist =============================
  const syncWishlistMutation = useMutation({
    mutationFn: wishlistApi.syncLocalWishlist,
    onSuccess: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
      toast.success("Lista życzeń została zsynchronizowana");
    },
    onError: () => {
      toast.error("Nie udało się zsynchronizować listy życzeń");
    },
  });

  // Sync local wishlist with server when user logs in
  useEffect(() => {
    if (username) {
      console.log("Executing syncing...");
      const localWishlist = getLocalWishlist();
      if (localWishlist.length > 0) {
        syncWishlistMutation.mutate(localWishlist);
      }
    }
  }, [username]);

  return {
    wishlist,
    isLoading,
    error,
    addToWishlist: addToWishlistMutation.mutate,
    removeFromWishlist: removeFromWishlistMutation.mutate,
    isAddingToWishlist: addToWishlistMutation.isPending,
    isRemovingFromWishlist: removeFromWishlistMutation.isPending,
  };
};
