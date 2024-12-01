// import { getCategories, filterProducts } from "@/lib/features/productsSlice";
// import { nanoid } from "@reduxjs/toolkit";
// import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router";
import data from "../../../data";

const CategoriesButtons = () => {
  //   const categories = useSelector((state) => state.products.categories);
  //   const currentCategory = useSelector(
  //     (state) => state.products.currentCategory
  //   );

  //   const dispatch = useDispatch();

  //   get unique categories buttons
  //   useEffect(() => {
  //     dispatch(getCategories());
  //   }, []);

  //   console.log(currentCategory);
  const categories = data?.map((item) => item.category);
  console.log(categories);
  return (
    <div>
      <Link to={"/"} className="inline-flex items-center cursor-pointer">
        <IoIosArrowBack />
        <h4>Home</h4>
      </Link>
      <div className="mt-6">
        <h1 className="text-center uppercase font-semibold">
          current category
        </h1>
        <div className="flex justify-center flex-wrap gap-3 md:gap-6 mt-4">
          {["all", ...new Set(categories)].map((category, index) => {
            return (
              <button
                key={index}
                className={`${
                  category ? "text-white bg-yellow-600" : "text-yellow-600"
                }  hover:text-white capitalize font-semibold block border-2 border-yellow-600 hover:bg-yellow-600 transition-all duration-300 cursor-pointer px-2 py-[0.025rem]`}
                // onClick={() => dispatch(filterProducts(category))}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesButtons;
