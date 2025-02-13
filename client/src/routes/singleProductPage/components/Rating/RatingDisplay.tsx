import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import RatingBadge from "./RatingBadge";
import { MoonLoader } from "react-spinners";
import { ProductRating } from "@/utils/types";

type RatingDisplayProps = {
  averageRating: number | undefined;
  totalRatings: number | undefined;
  ratings: Record<1 | 2 | 3 | 4 | 5, number | undefined>;
  isPending: boolean;
  error: Error | null;
  productRating: ProductRating | undefined;
};

const RatingDisplay = ({
  averageRating,
  totalRatings,
  ratings,
  isPending,
  error,
  productRating,
}: RatingDisplayProps) => {
  if (isPending)
    return (
      <div className="flex items-center justify-center h-[200px] w-[200px]">
        <MoonLoader />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!productRating)
    return <div className="mt-7">Dane są w tej chwili niedostępne</div>;

  return (
    <Card className="w-full max-w-lg my-6">
      <CardContent className="p-6">
        <RatingBadge
          averageRating={averageRating}
          totalRatings={totalRatings}
          className="mb-6"
        />
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-4">
              <div className="flex items-center gap-1 w-20">
                <span>{stars}</span>
                <Star className="w-4 h-4 text-yellow-400" />
              </div>
              <Progress
                value={
                  (ratings?.[stars as 1 | 2 | 3 | 4 | 5] ??
                    0 / (totalRatings ?? 0)) * 100
                }
                className="h-2 flex-1 border border-black"
              />
              <div className="w-16 text-sm text-gray-600 text-right">
                {ratings[stars as 1 | 2 | 3 | 4 | 5]}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RatingDisplay;
