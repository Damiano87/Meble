import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineMinus } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useChangeQuantity } from "@/hooks/cart/useChangeQuantity";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useDeleteCartItem } from "@/hooks/cart/useDeleteCartItem";

type ChangeAmountProps = {
  quantity: number | string;
  cartItemId: string;
  isAsideCart?: boolean;
};

const ChangeAmount = ({
  quantity,
  cartItemId,
  isAsideCart,
}: ChangeAmountProps) => {
  const [amount, setAmount] = useState(quantity);
  const { mutate: changeQuantity, isPending } = useChangeQuantity();
  const deleteCartItem = useDeleteCartItem();

  // change quantity
  const handleQuantityChange = (newQuantityNumber: string | number) => {
    if (newQuantityNumber === "") {
      setAmount("");
      return;
    }

    const newQuantity = Number(newQuantityNumber);
    // if quantity is 0, delete the item from the cart
    if (newQuantity === 0) {
      deleteCartItem(cartItemId);
    } else if (newQuantity <= 99) {
      setAmount(newQuantity);
      changeQuantity({ newQuantity, cartItemId });
    }
  };

  if (isPending) return <LoadingIndicator />;

  return (
    <div
      className={`
      border-[1px] border-red-900 text-red-900 flex items-center justify-center gap-1 px-[2px] py-1 rounded-sm
      ${isAsideCart && "scale-75 transform-origin-center"}
    `}
    >
      <button
        className="rounded-full hover:bg-slate-200 duration-300 p-[1px]"
        onClick={() => handleQuantityChange(Number(amount) - 1)}
      >
        <HiOutlineMinus size={isAsideCart ? 14 : 18} />
      </button>
      <Input
        value={amount}
        onChange={(e) => handleQuantityChange(e.target.value)}
        max={99}
        maxLength={2}
        className="w-7 h-7 px-[5px] font-medium border-none focus-visible:ring-0 text-center"
      />
      <button
        className="rounded-full hover:bg-slate-200 duration-300 p-[1px]"
        onClick={() => handleQuantityChange(Number(amount) + 1)}
      >
        <AiOutlinePlus size={isAsideCart ? 14 : 18} />
      </button>
    </div>
  );
};
export default ChangeAmount;
