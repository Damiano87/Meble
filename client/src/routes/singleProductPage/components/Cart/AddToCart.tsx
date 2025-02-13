import Amount from "./Amount";
import { useState } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useModal } from "@/hooks/useModal";
import ErrorAddToCartDialog from "./ErrorAddToCartDialog";
import SuccessAddToCartDialog from "./SuccesAddToCartDialog";

type AddToCartProps = {
  productId: string;
  name: string;
  price: number;
  image: string;
};
const AddToCart = ({ productId, name, price, image }: AddToCartProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  // hooks for modals
  const successModal = useModal();
  const errorModal = useModal();

  const { mutate, isPending } = useAddToCart({
    onSuccess: successModal.openModal,
    onError: errorModal.openModal,
  });

  if (isPending) return <LoadingIndicator />;

  return (
    <div className="flex items-center gap-2 mt-8">
      <Amount quantity={quantity} setQuantity={setQuantity} />
      <button
        className="flex-[4] w-full font-semibold cursor-pointer bg-red-900 hover:bg-white text-white hover:text-red-900 duration-500 px-3 py-2 border border-red-900 rounded-sm"
        onClick={() => mutate({ productId, quantity })}
      >
        Do koszyka
      </button>

      {/* error dialog */}
      <ErrorAddToCartDialog
        open={errorModal.isOpen}
        onOpenChange={errorModal.closeModal}
        setQuantity={setQuantity}
      />

      {/* success dialog */}
      <SuccessAddToCartDialog
        open={successModal.isOpen}
        onOpenChange={successModal.closeModal}
        name={name}
        price={price}
        image={image}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </div>
  );
};

export default AddToCart;
