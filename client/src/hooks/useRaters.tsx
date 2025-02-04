import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useMemo } from "react";
import apiRequest from "@/api/apiRequest";

type SortOption = "newest" | "oldest" | "highest" | "lowest";

interface Rater {
  id: string;
  username: string;
  rating: number;
  comment: string | undefined;
  createdAt: Date;
}

// get product ratings from api
export const fetchRaters = async (
  productId: string,
  numberOfStars?: string[]
): Promise<Rater[]> => {
  const response = await apiRequest.get<Rater[]>(
    `/ratings/products/${productId}/raters`,
    {
      params: { numberOfStars },
    }
  );
  return response.data;
};

export const useRaters = (productId: string) => {
  // get query parameter
  const [searchParams] = useSearchParams();

  const numberOfStars = searchParams.get("number_of_stars")?.split(" ") || [];
  const sortOrder = (searchParams.get("sort") as SortOption) || "newest";

  const {
    data: raters,
    isPending,
    error,
  } = useQuery<Rater[]>({
    queryKey: ["raters", productId, numberOfStars],
    queryFn: () => fetchRaters(productId, numberOfStars),
  });

  const sortedRaters = useMemo(() => {
    if (!raters) return [];

    return [...raters].sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "highest":
          return (
            b.rating - a.rating || // first sort ratings
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ); // if ratings are equal, sort by date
        case "lowest":
          return (
            a.rating - b.rating ||
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        default:
          return 0;
      }
    });
  }, [raters, sortOrder]);

  return { raters: sortedRaters, isPending, error };
};
