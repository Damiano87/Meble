import AdditionalInfo from "./AdditionalInfo";
import AddToCart from "./AddToCart";
import Amount from "./Amount";
import Delivery from "./Delivery";
import Price from "./Price";
import RatingBadge from "./RatingBadge";

type MainInfoProps = {
  category: string;
  price: number;
  averageRating: number | undefined;
  totalRatings: number | undefined;
  handleScrollToRatings: () => void;
  setIsRatingButtonOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainInfo = ({
  category,
  price,
  averageRating,
  totalRatings,
  handleScrollToRatings,
  setIsRatingButtonOpen,
}: MainInfoProps) => {
  // handle scroll to ratings button click and open it
  const scrollToRatingsAndOpen = () => {
    handleScrollToRatings();
    setIsRatingButtonOpen(true);
  };

  return (
    <div className="mt-8 md:mt-0">
      <Price category={category} price={price} />
      {/* scroll to ratings button and open it */}
      <button
        className="flex items-center gap-3"
        onClick={scrollToRatingsAndOpen}
      >
        <b className="text-[1.4rem] font-medium mb-1">Oceny:</b>
        <RatingBadge
          averageRating={averageRating}
          totalRatings={totalRatings}
          className="my-5"
        />
      </button>
      <Amount />
      <Delivery />
      <AddToCart />
      <AdditionalInfo />
    </div>
  );
};
export default MainInfo;
