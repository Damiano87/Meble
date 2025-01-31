import { cn } from "@/lib/utils";
import Stars from "./Stars";

interface RatingBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  averageRating: number | undefined;
  totalRatings: number | undefined;
  starClassName?: string;
}

const RatingBadge = ({
  averageRating,
  totalRatings,
  className,
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
      <Stars averageRating={averageRating} />
      <div className="text-2xl font-bold">{averageRating}</div>
      <div className="text-sm text-gray-500">
        ({totalRatings} {setName(totalRatings)})
      </div>
    </div>
  );
};

export default RatingBadge;
