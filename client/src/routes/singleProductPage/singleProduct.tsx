import { IoIosArrowBack } from "react-icons/io";
import { Link, useLoaderData } from "react-router";

import { Product } from "../../utils/types";
import Images from "./components/Images";
import MainInfo from "./components/MainInfo";
import SecondInfo from "./components/SecondInfo";
import ThirdInfo from "./components/ThirdInfo";

const SingleProductPage = () => {
  const product = useLoaderData() as Product;

  // desctructured product
  const { name, images, category, price } = product;

  return (
    <div className="mx-auto mt-32 max-w-6xl px-5 lg:px-0">
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
          <MainInfo category={category} price={price} />
        </div>
      </section>
      <SecondInfo product={product} />
      <ThirdInfo product={product} />
    </div>
  );
};

export default SingleProductPage;
