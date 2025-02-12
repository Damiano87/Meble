import { CartItemType } from "@/utils/types";

const GetAmount = ({
  cartItems,
}: {
  cartItems: CartItemType[] | undefined;
}) => {
  if (!cartItems) return null;

  // get amount of cart items and name them accordingly
  const getAmount = (): string => {
    const itemsLength = cartItems?.length;
    if (itemsLength === 0) return "0 pozycji";
    else if (itemsLength === 1) return "1 pozycja";
    else if (itemsLength > 1 && itemsLength < 5)
      return `${itemsLength} pozycje`;
    return `${itemsLength} pozycji`;
  };

  return <span className="text-[1.2rem] font-semibold">{getAmount()}</span>;
};
export default GetAmount;
