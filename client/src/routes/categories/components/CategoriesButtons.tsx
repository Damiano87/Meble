import { IoIosArrowBack } from "react-icons/io";
import { Link, useSearchParams } from "react-router";

const CategoriesButtons = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const searchCategories = (param: string) => {
    const params = new URLSearchParams(searchParams);

    if (param === "all") {
      params.delete("category");
    } else {
      params.set("category", param);
    }
    setSearchParams(params);
  };

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
          {["all", "sypialnia", "kuchnia", "salon"].map((category, index) => {
            return (
              <button
                key={index}
                className={`
              ${
                currentCategory === category
                  ? "text-white bg-yellow-600"
                  : "text-yellow-600"
              }
              hover:text-white 
              capitalize 
              font-semibold 
              block 
              border-2 
              border-yellow-600 
              hover:bg-yellow-600 
              transition-all 
              duration-300 
              cursor-pointer 
              px-2 
              py-[0.025rem]
            `}
                onClick={() => searchCategories(category)}
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
