import { useState } from "react";
import { formatToPLN } from "../../../utils/functions";
import { Link } from "react-router";

type TopEightProps = {
  topEight: {
    id: string;
    name: string;
    price: number;
    images: string[];
  }[];
};

const PopularProducts = ({ topEight }: TopEightProps) => {
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  return (
    <section id="popularne" className="mx-auto mt-28 px-5">
      <h1 className="text-[1.5rem] font-semibold tracking-wider mb-4">
        Popularne produkty
      </h1>
      <div className="md:w-full grid md:grid-cols-2 lg:grid-cols-[1fr,1fr,1fr,1fr] gap-7 justify-items-center mx-auto">
        {topEight?.map((product) => {
          const { id, name, price, images } = product;
          const isHovered = hoveredProductId === id;
          return (
            <Link
              to={`/categories/${id}`}
              key={id}
              className="relative flex flex-col justify-between w-full hover:border-black duration-500 cursor-pointer border-4 px-6 py-4"
              onMouseEnter={() => setHoveredProductId(id)}
              onMouseLeave={() => setHoveredProductId(null)}
            >
              <div className="relative h-[20rem] mb-6">
                <img
                  src={isHovered && images[1] ? images[1] : images[0]}
                  className="object-contain w-full h-full"
                  alt={name}
                />
              </div>
              <div>
                <h3 className="capitalize">{name}</h3>
                <p className="font-semibold">{formatToPLN(price)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default PopularProducts;
