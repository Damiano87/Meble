import { capitalizeFirstLetter, formatToPLN } from "@/utils/functions";

type CartItemForOrderProps = {
  quantity: number;
  cartProduct: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
};

const CartItemForOrder = ({
  quantity,
  cartProduct: { name, price, images },
}: CartItemForOrderProps) => {
  return (
    <div className="border border-black rounded-sm p-2 max-w-[30rem]">
      <div className="flex items-start justify-between mb-2">
        <div className="flex gap-4">
          <div className="w-14 aspect-square flex items-center justify-center hover:scale-[4] duration-300">
            <img
              src={images[0]}
              alt={name}
              className="max-w-full max-h-full object-cover"
            />
          </div>
          <span className="font-medium">{capitalizeFirstLetter(name)}</span>
        </div>
        <span className="font-semibold">{formatToPLN(price)}</span>
      </div>
      <span>
        Ilość: <span className="font-semibold">{quantity}</span>
      </span>
    </div>
  );
};
export default CartItemForOrder;
