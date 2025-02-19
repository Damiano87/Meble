import { formatToPLN } from "@/utils/functions";
import ProductName from "../../cart/components/ProductName";
import { WishlistItem } from "@/utils/types";
import RemoveItemFromWishlist from "./RemoveItemFromWishlist";
import AddWishItemToCart from "./AddWishItemToCart";

const WishItem = ({
  product: { name, images, stock, price },
  productId,
}: WishlistItem) => {
  return (
    <div className="rounded-md p-4 flex flex-col md:flex-row gap-y-5 justify-between border-b-2">
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
            <ProductName name={name} productId={productId} />
            <RemoveItemFromWishlist wishItemId={productId} />
          </div>
          <div>
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
        <AddWishItemToCart productId={productId} />
        <span className="text-slate-500 text-[1.1rem] justify-self-end">
          {formatToPLN(price)}
        </span>
      </div>
    </div>
  );
};

export default WishItem;
