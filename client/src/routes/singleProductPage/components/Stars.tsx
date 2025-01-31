import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const Stars = ({
  averageRating,
  className,
}: {
  averageRating: number | undefined;
  className?: string;
}) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "w-5 h-5",
            star <= Math.round(Number(averageRating))
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300",
            className
          )}
        />
      ))}
    </div>
  );
};
export default Stars;
