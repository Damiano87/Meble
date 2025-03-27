import { capitalizeFirstLetter, formatToPLN } from "@/utils/functions";
import { type SubOrderItem } from "@/utils/types";

const SubOrderItem = ({ orderItem }: { orderItem: SubOrderItem }) => {
  return (
    <div className="flex gap-4 font-semibold border-2 p-2 max-w-[25rem]">
      <div className="w-14 aspect-square">
        <img
          src={orderItem.product.images[0]}
          alt={orderItem.product.name}
          className="object-cover max-w-full max-h-full mx-auto"
        />
      </div>
      <div>
        <span>{capitalizeFirstLetter(orderItem.product.name)}</span>
        <span className="block">
          <span className="font-normal">Ilość: </span>
          {orderItem.quantity}
        </span>
      </div>
      <span className="ml-auto">{formatToPLN(orderItem.product.price)}</span>
    </div>
  );
};
export default SubOrderItem;
