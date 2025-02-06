import { IoIosArrowBack } from "react-icons/io";
import { Link, useLoaderData } from "react-router";
import { Product } from "../../utils/types";
import Images from "./components/Images";
import MainInfo from "./components/MainInfo";
import SecondInfo from "./components/SecondInfo";
import ThirdInfo from "./components/ThirdInfo";
import { Helmet } from "react-helmet-async";
import { capitalizeFirstLetter } from "@/utils/functions";
import RatingDialog from "./components/RatingDialog";
import axios from "../../api/apiRequest";
import { ProductRating } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";

// get product ratings from api
export const fetchProductRatings = async (
  productId: string
): Promise<ProductRating> => {
  const response = await axios.get<ProductRating>(
    `/ratings/products/${productId}/ratings`
  );
  return response.data;
};

const SingleProductPage = () => {
  // handle rating button state
  const [isRatingButtonOpen, setIsRatingButtonOpen] = useState(false);

  // ref for rating button to open it
  const ratingButtonRef = useRef<HTMLDivElement | null>(null);

  // fetch product data using react router loader
  const product = useLoaderData() as Product;

  // desctructured product
  const { id, name, images, category, price } = product;

  // handle scroll to ratings button
  const handleScrollToRatings = () => {
    if (ratingButtonRef.current) {
      ratingButtonRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // fetch product ratings using react query
  const {
    data: productRating,
    isPending,
    error,
  } = useQuery({
    queryKey: ["productRating", id],
    queryFn: () => fetchProductRatings(id),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

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
            category={category}
            price={price}
            averageRating={averageRating}
            totalRatings={totalRatings}
            handleScrollToRatings={handleScrollToRatings}
            setIsRatingButtonOpen={setIsRatingButtonOpen}
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
