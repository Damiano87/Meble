// import { resetQuantity } from "@/lib/features/cartSlice";
// import { resetImgIndex } from "@/lib/features/singleProductSlice";
// import { useSelector, useDispatch } from "react-redux";
import products from "../../../data";
import { formatToPLN } from "../../../utils/functions";
import { Link } from "react-router";
import { useState } from "react";

const PopularProducts = () => {
  const [popularProducts, setPopularProducts] = useState(products);

  return (
    <section id="popularne" className="mx-auto mt-28 px-5">
      <h1 className="text-[1.5rem] font-semibold tracking-wider mb-4">
        Popularne produkty
      </h1>
      <div className="md:w-full grid md:grid-cols-2 lg:grid-cols-[1fr,1fr,1fr,1fr] gap-7 justify-items-center mx-auto">
        {[...popularProducts]
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 8)
          .map((product) => {
            const { id, name, price, category, inStore, likes, images } =
              product;
            return (
              <Link
                // onClick={() => {
                //   dispatch(resetImgIndex());
                //   dispatch(resetQuantity());
                // }}
                to={`/categories/${id}`}
                key={id}
                className="relative w-full hover:border-black duration-500 cursor-pointer border-4 px-6 py-4"
              >
                <div className="relative h-[20rem] mb-6">
                  <img
                    src={images[0]}
                    // sizes="(max-width: 768px) 100vw"
                    className="object-contain w-full h-full"
                    alt={name}
                  />
                </div>
                <div>
                  <h3 className="capitalize">{name}</h3>
                  <p className="font-semibold">{formatToPLN(price)}</p>
                </div>
                {inStore ? (
                  <div className="absolute top-0 left-0 bg-yellow-600 rounded-br-lg px-2 py-1">
                    <h4 className="text-white">w magazynie</h4>
                  </div>
                ) : null}
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default PopularProducts;
