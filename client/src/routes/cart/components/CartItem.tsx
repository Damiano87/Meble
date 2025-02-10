import ChangeAmount from "./ChangeAmount";
import { capitalizeFirstLetter, formatToPLN } from "@/utils/functions";
import { type CartItemType } from "@/utils/types";
import RemoveItemFromCart from "./RemoveItemFromCart";

const CartItem = ({
  id,
  product: { name, images, stock, price },
  quantity,
}: CartItemType) => {
  return (
    <div className="rounded-md p-4 flex flex-col md:flex-row gap-y-5 justify-between">
      <div className="flex items-start gap-6">
        <div className="w-24 aspect-square flex items-center justify-center">
          <img
            src={images[0]}
            className="max-w-full max-h-full object-cover"
            alt="bed"
          />
        </div>
        <div>
          <div className="flex items-center gap-5">
            <h4>{capitalizeFirstLetter(name)}</h4>
            <RemoveItemFromCart cartItemId={id} />
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
      <div className="grid grid-cols-2 items-center gap-5 h-fit">
        <ChangeAmount cartItemId={id} quantity={quantity} />
        <span className="text-[1.1rem] justify-self-end">
          {formatToPLN(price)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
