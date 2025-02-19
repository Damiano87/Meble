import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useMemo } from "react";
import { RatersResponse } from "@/utils/types";
import { fetchRatersApi } from "@/api/rating/fetchRaters";

type SortOption = "newest" | "oldest" | "highest" | "lowest";

export const useRaters = (productId: string) => {
  // get query parameter
  const [searchParams] = useSearchParams();

  const numberOfStars = searchParams.get("number_of_stars")?.split(" ") || [];
  const sortOrder = (searchParams.get("sort") as SortOption) || "newest";
  const page = searchParams.get("page") || "1";
  const limit = "2"; // set limit to 10 items per page

  const { data, isPending, error } = useQuery<RatersResponse>({
    queryKey: ["raters", productId, numberOfStars, page],
    queryFn: () => fetchRatersApi(productId, page, limit, numberOfStars),
  });

  const sortedRaters = useMemo(() => {
    if (!data?.raters) return [];

    return [...data.raters].sort((a, b) => {
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
  }, [data?.raters, sortOrder]);

  return {
    raters: sortedRaters,
    isPending,
    error,
    totalPages: data?.totalPages || 0,
    currentPage: data?.currentPage || 1,
    totalCount: data?.totalCount || 0,
  };
};
