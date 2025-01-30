import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

const Rating = () => {
  const ratings: Record<1 | 2 | 3 | 4 | 5, number> = {
    5: 245,
    4: 132,
    3: 45,
    2: 12,
    1: 8,
  };

  // calculate sum of all ratings
  const totalRatings = Object.values(ratings).reduce(
    (sum, count) => sum + count,
    0
  );

  // calculate average rating
  const averageRating = (
    Object.entries(ratings).reduce(
      (sum, [rating, count]) => sum + Number(rating) * count,
      0
    ) / totalRatings
  ).toFixed(2);

  return (
    <Card className="w-full max-w-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-4xl font-bold">{averageRating}</div>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(Number(averageRating))
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500">({totalRatings} ocen)</div>
        </div>

        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-4">
              <div className="flex items-center gap-1 w-20">
                <span>{stars}</span>
                <Star className="w-4 h-4 text-yellow-400" />
              </div>
              <Progress
                value={
                  (ratings[stars as 1 | 2 | 3 | 4 | 5] / totalRatings) * 100
                }
                className="h-2 flex-1"
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

export default Rating;
