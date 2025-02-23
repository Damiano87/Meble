import { createRatingApi } from "@/api/rating/ratingApi";
import { useQuery } from "@tanstack/react-query";

export const useGetProductRatings = (id: string | undefined) => {
  const { productRatingsApi } = createRatingApi();
  // fetch product ratings using react query
  const {
    data: productRating,
    isPending,
    error,
  } = useQuery({
    queryKey: ["productRating", id],
    queryFn: () => productRatingsApi(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  return { productRating, isPending, error };
};
