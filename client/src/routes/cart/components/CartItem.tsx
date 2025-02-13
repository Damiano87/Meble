import ChangeAmount from "./ChangeAmount";
import { formatToPLN } from "@/utils/functions";
import { type CartItemType } from "@/utils/types";
import RemoveItemFromCart from "./RemoveItemFromCart";
import { cn } from "@/lib/utils";
import ProductName from "./ProductName";

type CartItemProps = {
  className?: string;
  imageClassName?: string;
  stockClassName?: string;
  isAsideCart?: boolean;
} & CartItemType;

const CartItem = ({
  id,
  product: { id: productId, name, images, stock, price },
  quantity,
  className,
  imageClassName,
  stockClassName,
  isAsideCart,
}: CartItemProps) => {
  return (
    <div
      className={cn(
        "rounded-md p-4 flex flex-col md:flex-row gap-y-5 justify-between",
        className
      )}
    >
      <div className="flex items-start gap-6">
        <div
          className={cn(
            "w-24 aspect-square flex items-center justify-center",
            imageClassName
          )}
        >
          <img
            src={images[0]}
            className="max-w-full max-h-full object-cover"
            alt="bed"
          />
        </div>
        <div>
          <div className="flex items-center gap-5">
            <ProductName
              name={name}
              productId={productId}
              isAsideCart={isAsideCart}
            />
            <RemoveItemFromCart cartItemId={id} />
          </div>
          <div className={cn(stockClassName)}>
            <p className="text-[.8rem] mt-2">
              Dostępne: {stock > 0 ? "TAK" : "NIE"}
            </p>
            <p className="text-[.8rem]">
              <span>Prawo zwrotu: </span>
              <span className="text-red-900">365 dni</span>
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 items-center gap-5 h-fit">
        <ChangeAmount
          cartItemId={id}
          quantity={quantity}
          isAsideCart={isAsideCart}
        />
        <span
          className={`${
            isAsideCart ? "text-slate-500 text-[.9rem]" : "text-[1.1rem]"
          } justify-self-end`}
        >
          {isAsideCart ? formatToPLN(price * quantity) : formatToPLN(price)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
