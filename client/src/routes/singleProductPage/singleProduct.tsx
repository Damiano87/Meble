import { IoIosArrowBack } from "react-icons/io";
import { Link, useLoaderData } from "react-router";

import { Product } from "../../utils/types";
import Images from "./components/Images";
import MainInfo from "./components/MainInfo";

const SingleProductPage = () => {
  const product = useLoaderData() as Product;

  console.log(product);

  // desctructured product
  const { name, images, category, price } = product;

  return (
    <div className="w-[90vw] lg:w-full mx-auto mt-32 max-w-6xl lg:px-5">
      <Link
        to={"/categories"}
        className="inline-flex items-center cursor-pointer"
      >
        <IoIosArrowBack />
        <h4>Kategorie</h4>
      </Link>
      <div className="mt-4">
        <h1 className="text-[1.3rem] text-center capitalize font-semibold">
          {name}
        </h1>
        <div className="md:grid grid-cols-2 gap-14 mt-6">
          <Images name={name} images={images} />
          <MainInfo category={category} price={price} />
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
