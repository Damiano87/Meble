import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../../api/apiRequest";
import Rater from "./Rater";
import GetSpecificRaters from "./GetSpecificRaters";
import { useSearchParams } from "react-router";
import SortRaters from "./SortRaters";
import LoadingIndicator from "@/components/LoadingIndicator";

type ProductRater = {
  id: string;
  username: string;
  rating: number;
  comment: string | undefined;
  createdAt: Date;
};

// get product ratings from api
export const fetchRaters = async (
  productId: string,
  numberOfStars?: string[]
): Promise<ProductRater[]> => {
  const response = await apiRequest.get<ProductRater[]>(
    `/ratings/products/${productId}/raters`,
    {
      params: { numberOfStars },
    }
  );
  return response.data;
};

const Raters = ({
  id,
  ratings,
}: {
  id: string;
  ratings: Record<5 | 2 | 1 | 4 | 3, number | undefined>;
}) => {
  // get query parameter
  const [searchParams] = useSearchParams();

  const numberOfStars = searchParams.get("number_of_stars")?.split(" ") || [];

  // fetch product raters using react query
  const {
    data: productRaters,
    isPending,
    error,
  } = useQuery({
    queryKey: ["productRaters", id, numberOfStars],
    queryFn: () => fetchRaters(id, numberOfStars),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  // pending state
  if (isPending) return <LoadingIndicator />;

  // if rror
  if (error) return <div>Error: {error.message}</div>;

  // if no raters
  if (!productRaters)
    return (
      <div className="my-7 text-[1.4rem] font-medium">
        Ten produkt nie ma jeszcze ocen.
      </div>
    );

  return (
    <div className="borde border-red-600">
      <div className="md:flex items-start justify-between space-y-4 md:space-y-0">
        <GetSpecificRaters ratings={ratings} />
        <SortRaters />
      </div>
      <div className="space-y-3 my-7 max-w-[40rem]">
        {productRaters.map((rater) => (
          <Rater key={rater.id} {...rater} />
        ))}
      </div>
    </div>
  );
};

export default Raters;
