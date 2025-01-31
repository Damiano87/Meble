import { Product } from "@/utils/types";
import MaterialDetails from "./MaterialDetails";
import Resistance from "./Resistance";
import AdditionalInformation from "./AdditionalInformation";
import CareTipsWithButton from "./CareTipsWithButton";
import Packing from "./Packing";
import RatingButton from "./RatingButton";
import { ProductRating } from "@/utils/types";
import { forwardRef } from "react";

type ThirdInfoProps = {
  product: Product;
  averageRating: number | undefined;
  totalRatings: number | undefined;
  ratings: Record<1 | 2 | 3 | 4 | 5, number | undefined>;
  isPending: boolean;
  error: Error | null;
  productRating: ProductRating | undefined;
  isRatingButtonOpen: boolean;
  setIsRatingButtonOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThirdInfo = forwardRef<HTMLDivElement, ThirdInfoProps>(
  (
    {
      product,
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
    const {
      id,
      materialDetails,
      resistance,
      additionalInfo,
      careTips,
      packing,
      techData,
    } = product;

    return (
      <section className="mt-14 border-b-2" ref={ref}>
        {materialDetails.length > 0 && (
          <MaterialDetails materialDetails={materialDetails} />
        )}
        {resistance && <Resistance resistance={resistance} />}
        {additionalInfo && (
          <AdditionalInformation additionalInfo={additionalInfo} />
        )}
        {careTips.length > 0 && techData.length === 0 && (
          <CareTipsWithButton careTips={careTips} />
        )}
        {packing.length > 0 && <Packing packing={packing} />}
        <RatingButton
          id={id}
          averageRating={averageRating}
          totalRatings={totalRatings}
          ratings={ratings}
          isPending={isPending}
          error={error}
          productRating={productRating}
          isRatingButtonOpen={isRatingButtonOpen}
          setIsRatingButtonOpen={setIsRatingButtonOpen}
          ref={ref}
        />
      </section>
    );
  }
);

export default ThirdInfo;
