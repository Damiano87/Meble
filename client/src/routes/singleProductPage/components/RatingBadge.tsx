import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface RatingBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  averageRating: number | undefined;
  totalRatings: number | undefined;
  starClassName?: string;
}

const RatingBadge = ({
  averageRating,
  totalRatings,
  className,
  starClassName,
  ...props
}: RatingBadgeProps) => {
  // 1 ocena, 2-4 oceny, 5+ ocen
  const setName = (rating: number | undefined) => {
    return rating === 1
      ? "ocena"
      : rating === 2 || rating === 3 || rating === 4
      ? "oceny"
      : "ocen";
  };

  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "w-5 h-5",
              star <= Math.round(Number(averageRating))
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300",
              starClassName
            )}
          />
        ))}
      </div>
      <div className="text-2xl font-bold">{averageRating}</div>
      <div className="text-sm text-gray-500">
        ({totalRatings} {setName(totalRatings)})
      </div>
    </div>
  );
};

export default RatingBadge;
