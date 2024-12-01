// import { setImgIndex } from "@/lib/features/singleProductSlice";
// import { useParams } from "next/navigation";
// import { useSelector, useDispatch } from "react-redux";
// import { addItem, decrement, increment } from "@/lib/features/cartSlice";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router";
import data from "../../data";
import { formatToPLN } from "~/utils/functions";
import { type Product } from "~/utils/types";

const singleProductPage = () => {
  //   const allProducts = useSelector((state) => state.products.allProducts);
  //   const imgIndex = useSelector((state) => state.single.imgIndex);
  //   const quantity = useSelector((state) => state.cart.quantity);
  //   const dispatch = useDispatch();
  const [imgIndex, setImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const id = useParams().id;
  const singleProduct = data?.find((product) => product.id === Number(id));

  const { name, price, category, inStore, likes, images } =
    singleProduct as Product;

  // increment quandtity function
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  // decrement quandtity function
  const decrement = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

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
        <div className="md:grid grid-cols-2 mt-6">
          <div>
            <div className="relative h-[15rem] max-w-52 mx-auto mb-6">
              <img
                src={images[imgIndex]}
                sizes="(max-width: 768px) 100vw"
                className="object-contain w-full h-full"
                alt={name}
              />
            </div>
            <div className="flex justify-evenly items-center max-w-[25rem] mx-auto">
              {images?.map((image, index) => {
                return (
                  <div
                    key={image}
                    className={`${
                      imgIndex === index
                        ? "border-2 border-yellow-600 shadow-md"
                        : null
                    } relative h-[5rem] w-[5rem] p-1 max-w-52 cursor-pointer`}
                    onClick={() => setImgIndex(index)}
                  >
                    <img
                      src={image}
                      sizes="(max-width: 768px) 100vw"
                      className="object-contain w-full h-full"
                      alt={name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="md:flex flex-col justify-between bg-slate-300 p-4 md:p-7 mt-8 md:mt-0">
            <div>
              <p className="text-[1.2rem] font-semibold">
                Kategoria: <span className="capitalize">{category}</span>
              </p>
              <p className="text-[1.2rem] font-semibold">
                W magazynie: {inStore ? "tak" : "nie"}
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-y-3 justify-between items-center mt-4">
              <h2 className="text-[1.3rem] font-semibold">Ilość</h2>
              <div className="flex items-center">
                <button
                  onClick={decrement}
                  className="border border-black bg-white hover:bg-slate-300 duration-300 text-[1.3rem] w-8 cursor-pointer"
                >
                  -
                </button>
                <p className="grid place-content-center border border-l-0 border-r-0 border-black text-[1.3rem] w-8">
                  {quantity}
                </p>
                <button
                  onClick={increment}
                  className="border border-black bg-white hover:bg-slate-300 duration-300 text-[1.3rem] w-8 cursor-pointer"
                >
                  +
                </button>
              </div>
              <h2 className="text-[1.3rem] font-semibold">
                {formatToPLN(price * quantity)}
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mt-8">
              <button
                // onClick={() => dispatch(addItem(singleProduct))}
                className="block w-full uppercase font-semibold cursor-pointer bg-transparent hover:bg-black hover:text-white duration-300 px-3 py-2 border border-black"
              >
                dodaj do koszyka
              </button>
              <button className="block w-full uppercase text-white font-semibold cursor-pointer bg-yellow-600 px-3 py-2 border border-transparent hover:text-yellow-600 hover:border-yellow-600 hover:bg-white duration-300">
                kup teraz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default singleProductPage;
