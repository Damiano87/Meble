// import { resetQuantity } from "@/lib/features/cartSlice";
// import { resetImgIndex } from "@/lib/features/singleProductSlice";
// import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { formatToPLN } from "../../../utils/functions";
import products from "../../../data";

const Trendy = () => {
  return (
    <section className="mt-28 px-5 mx-auto">
      <h1 className="text-[1.5rem] font-semibold tracking-wider mb-4">
        Trendy
      </h1>
      <div className="carousel carousel-center space-x-3 w-full bg-white p-4">
        {products.slice(5, 12).map((product) => {
          const { id, name, price, inStore, images } = product;
          return (
            <Link
              // onClick={() => {
              //   dispatch(resetImgIndex());
              //   dispatch(resetQuantity());
              // }}
              to={`/categories/${id}`}
              key={id}
              className="carousel-item"
            >
              <div className="relative w-[250px] hover:border-black duration-500 cursor-pointer border-4 px-6 py-4">
                <div className="relative h-[15rem] mx-auto mb-6">
                  <img
                    src={images[0]}
                    className="object-contain w-full h-full"
                    alt={name}
                  />
                </div>
                <div>
                  <h3 className="capitalize text-black">{name}</h3>
                  <p className="font-semibold text-black">
                    {formatToPLN(price)}
                  </p>
                </div>
                {inStore ? (
                  <div className="absolute top-0 left-0 bg-yellow-600 rounded-br-lg px-2 py-1">
                    <h4 className="text-white">w magazynie</h4>
                  </div>
                ) : null}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Trendy;
