import { useState } from "react";
import { formatToPLN } from "../../../utils/functions";

const Amount = ({ price }: { price: number }) => {
  const [quantity, setQuantity] = useState(1);

  // increment quantity function
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  // decrement quantity function
  const decrement = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  return (
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
  );
};
export default Amount;
