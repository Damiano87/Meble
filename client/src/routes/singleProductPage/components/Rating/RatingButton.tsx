import { forwardRef } from "react";
import { GoPlus } from "react-icons/go";
import { HiOutlineMinus } from "react-icons/hi2";
import RatingDisplay from "./RatingDisplay";
import RatingBadge from "./RatingBadge";
import { ProductRating } from "@/utils/types";
import Raters from "./Raters";

type RatingButtonProps = {
  id: string;
  averageRating: number | undefined;
  totalRatings: number | undefined;
  ratings: Record<1 | 2 | 3 | 4 | 5, number | undefined>;
  isPending: boolean;
  error: Error | null;
  productRating: ProductRating | undefined;
  isRatingButtonOpen: boolean;
  setIsRatingButtonOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RatingButton = forwardRef<HTMLDivElement, RatingButtonProps>(
  (
    {
      id,
      averageRating,
      totalRatings,
      ratings,
      isPending,
      error,
      productRating,
      isRatingButtonOpen,
      setIsRatingButtonOpen,
    },
    ref
  ) => {
    return (
      <div ref={ref}>
        <button
          onClick={() => setIsRatingButtonOpen(!isRatingButtonOpen)}
          className="flex items-center justify-between w-full border-t-2 py-2"
        >
          <div className="flex items-center gap-2">
            <h3 className="text-[.9rem] md:text-[1.3rem] font-semibold">
              Oceny klientów
            </h3>
            <RatingBadge
              averageRating={averageRating}
              totalRatings={totalRatings}
              className="hidden sm:flex"
            />
          </div>
          {isRatingButtonOpen ? (
            <HiOutlineMinus className="text-[1.3rem] md:text-[1.7rem]" />
          ) : (
            <GoPlus className="text-[1.3rem] md:text-[1.7rem]" />
          )}
        </button>
        {isRatingButtonOpen && (
          <div>
            <RatingDisplay
              averageRating={averageRating}
              totalRatings={totalRatings}
              ratings={ratings}
              isPending={isPending}
              error={error}
              productRating={productRating}
            />
            <Raters id={id} ratings={ratings} />
          </div>
        )}
      </div>
    );
  }
);
export default RatingButton;
