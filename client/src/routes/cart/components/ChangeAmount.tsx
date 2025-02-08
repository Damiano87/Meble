import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineMinus } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useChangeQuantity } from "@/hooks/useChangeQuantity";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useDeleteCartItem } from "@/hooks/useDeleteCartItem";

const ChangeAmount = ({
  quantity,
  cartItemId,
}: {
  quantity: number;
  cartItemId: string;
}) => {
  const [amount, setAmount] = useState(quantity);
  const { mutate: changeQuantity, isPending } = useChangeQuantity();
  const deleteCartItem = useDeleteCartItem();

  // change quantity
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      deleteCartItem(cartItemId);
    } else if (newQuantity <= 99) {
      setAmount(newQuantity);
      changeQuantity({ newQuantity, cartItemId });
    }
  };

  if (isPending) return <LoadingIndicator />;

  return (
    <div className="border-[1px] border-red-900 text-red-900 flex items-center justify-center gap-1 px-[2px] py-1 rounded-sm">
      <button
        className="rounded-full hover:bg-slate-200 duration-300 p-[1px]"
        onClick={() => handleQuantityChange(amount - 1)}
      >
        <HiOutlineMinus size={18} />
      </button>
      <Input
        value={amount}
        onChange={(e) => handleQuantityChange(Number(e.target.value))}
        max={99}
        maxLength={2}
        className="w-7 h-7 px-[5px] font-medium border-none focus-visible:ring-0 text-center"
      />
      <button
        className="rounded-full hover:bg-slate-200 duration-300 p-[1px]"
        onClick={() => handleQuantityChange(amount + 1)}
      >
        <AiOutlinePlus size={18} />
      </button>
    </div>
  );
};
export default ChangeAmount;
