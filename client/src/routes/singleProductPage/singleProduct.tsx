import { IoIosArrowBack } from "react-icons/io";
import { Link, useLoaderData } from "react-router";
import { Product } from "../../utils/types";
import Images from "./components/MainInfo/Images";
import MainInfo from "./components/MainInfo/MainInfo";
import SecondInfo from "./components/MainInfo/SecondInfo";
import ThirdInfo from "./components/AccordionInfo/ThirdInfo";
import { Helmet } from "react-helmet-async";
import { capitalizeFirstLetter } from "@/utils/functions";
import RatingDialog from "./components/Rating/RatingDialog";
import { useState, useRef } from "react";
import { useGetProductRatings } from "@/hooks/rating/useGetProductRatings";

const SingleProductPage = () => {
  // fetch product data using react router loader
  const product = useLoaderData() as Product;

  // desctructured product
  const { id, name, images, category, price, wishProductCount } = product;

  // get product ratings
  const { productRating, isPending, error } = useGetProductRatings(id);

  // handle rating button state
  const [isRatingButtonOpen, setIsRatingButtonOpen] = useState(false);

  // ref for rating button to open it
  const ratingButtonRef = useRef<HTMLDivElement | null>(null);

  console.log(productRating);

  // handle scroll to ratings button
  const handleScrollToRatings = () => {
    if (ratingButtonRef.current) {
      ratingButtonRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // destructure product rating data
  const {
    averageRating,
    totalRatings,
    oneStar,
    twoStars,
    threeStars,
    fourStars,
    fiveStars,
  } = productRating ?? {};

  // create a record of ratings for easy access
  const ratings: Record<1 | 2 | 3 | 4 | 5, number | undefined> = {
    5: fiveStars,
    4: fourStars,
    3: threeStars,
    2: twoStars,
    1: oneStar,
  };

  return (
    <div className="mx-auto mt-32 max-w-6xl px-5 lg:px-0">
      <Helmet>
        <title>{capitalizeFirstLetter(name)} | H Meble</title>
        <meta name="description" content={`${name}`} />
      </Helmet>
      <Link
        to={"/categories"}
        className="inline-flex items-center cursor-pointer"
      >
        <IoIosArrowBack />
        <h4>Kategorie</h4>
      </Link>
      <section className="mt-4">
        <h1 className="text-[1.3rem] text-center capitalize font-semibold">
          {name}
        </h1>
        <div className="flex flex-col md:flex-row gap-24 mt-6">
          <Images name={name} images={images} />
          <MainInfo
            id={id}
            name={name}
            images={images}
            category={category}
            price={price}
            averageRating={averageRating}
            totalRatings={totalRatings}
            handleScrollToRatings={handleScrollToRatings}
            setIsRatingButtonOpen={setIsRatingButtonOpen}
            wishProductCount={wishProductCount}
          />
        </div>
      </section>
      <RatingDialog id={id} />
      <SecondInfo product={product} />
      <ThirdInfo
        product={product}
        averageRating={averageRating}
        totalRatings={totalRatings}
        ratings={ratings}
        isPending={isPending}
        error={error}
        productRating={productRating}
        ref={ratingButtonRef}
        isRatingButtonOpen={isRatingButtonOpen}
        setIsRatingButtonOpen={setIsRatingButtonOpen}
      />
    </div>
  );
};

export default SingleProductPage;
