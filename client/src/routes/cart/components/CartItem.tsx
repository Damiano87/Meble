import { TfiClose } from "react-icons/tfi";
import ChangeAmount from "./ChangeAmount";
import { formatToPLN } from "@/utils/functions";
import { type CartItemType } from "@/utils/types";

const CartItem = ({
  id,
  product: { name, images, stock, price },
  quantity,
}: CartItemType) => {
  return (
    <div className="rounded-md p-4 flex flex-col md:flex-row gap-y-5 justify-between">
      <div className="flex items-start gap-6">
        <div className="w-24 aspect-square flex items-center">
          <img
            src={images[0]}
            className="max-w-full max-h-full object-cover"
            alt="bed"
          />
        </div>
        <div>
          <div className="flex items-center gap-5">
            <h4>{name}</h4>
            <button className="cursor-pointer">
              <TfiClose size={20} />
            </button>
          </div>
          <p className="text-[.8rem] mt-2">
            Dostępne: {stock > 0 ? "TAK" : "NIE"}
          </p>
          <p className="text-[.8rem]">
            <span>Prawo zwrotu: </span>
            <span className="text-red-900">365 dni</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end md:justify-normal gap-5 h-fit">
        <ChangeAmount cartItemId={id} quantity={quantity} />
        <span className="text-[1.1rem]">{formatToPLN(price)}</span>
      </div>
    </div>
  );
};

export default CartItem;
