import Amount from "./Amount";
import { useState } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useAddToCart } from "@/hooks/useAddToCart";

const AddToCart = ({ productId }: { productId: string }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { mutate, isPending, error } = useAddToCart();

  if (isPending) return <LoadingIndicator />;

  if (error)
    return (
      <div>{error.response?.data?.message || "Wystąpił nieznany błąd"}</div>
    );

  return (
    <div className="flex items-center gap-2 mt-8">
      <Amount quantity={quantity} setQuantity={setQuantity} />
      <button
        className="flex-[4] w-full font-semibold cursor-pointer bg-red-900 hover:bg-white text-white hover:text-red-900 duration-500 px-3 py-2 border border-red-900 rounded-sm"
        onClick={() => mutate({ productId, quantity })}
      >
        Do koszyka
      </button>
    </div>
  );
};

export default AddToCart;
