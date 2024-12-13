import { Link } from "react-router";
import { formatToPLN } from "../utils/functions";
import { useState } from "react";

type ProductProps = {
  id: string;
  name: string;
  price: number;
  images: string[];
};

const Product = ({ id, name, price, images }: ProductProps) => {
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
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
};
export default Product;
