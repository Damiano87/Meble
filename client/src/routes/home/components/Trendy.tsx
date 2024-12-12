import { Link } from "react-router";
import { formatToPLN } from "../../../utils/functions";

type TrendyProps = {
  trendyProducts: {
    id: string;
    name: string;
    price: number;
    images: string[];
  }[];
};

const Trendy = ({ trendyProducts }: TrendyProps) => {
  return (
    <section className="mt-28 px-5 mx-auto">
      <h1 className="text-[1.5rem] font-semibold tracking-wider mb-4">
        Trendy
      </h1>
      <div className="carousel carousel-center space-x-3 w-full bg-white p-4">
        {trendyProducts?.map((product) => {
          const { id, name, price, images } = product;
          return (
            <Link to={`/categories/${id}`} key={id} className="carousel-item">
              <div className="relative flex flex-col justify-between w-[250px] hover:border-black duration-500 cursor-pointer border-4 px-6 py-4">
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
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Trendy;
