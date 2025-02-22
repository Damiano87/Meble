import AdditionalInfo from "./AdditionalInfo";
import AddToCart from "../Cart/AddToCart";
import Delivery from "./Delivery";
import Price from "./Price";
import RatingBadge from "../Rating/RatingBadge";
import UserWishCount from "./UserWishCount";

type MainInfoProps = {
  id: string;
  name: string;
  images: string[];
  category: string;
  price: number;
  wishProductCount: number;
  averageRating: number | undefined;
  totalRatings: number | undefined;
  handleScrollToRatings: () => void;
  setIsRatingButtonOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainInfo = ({
  id,
  name,
  images,
  category,
  price,
  averageRating,
  totalRatings,
  wishProductCount,
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
      <Delivery />
      <AddToCart productId={id} name={name} image={images[0]} price={price} />
      <AdditionalInfo />
      <UserWishCount wishProductCount={wishProductCount} />
    </div>
  );
};
export default MainInfo;
