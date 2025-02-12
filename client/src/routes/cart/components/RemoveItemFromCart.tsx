import { Button } from "@/components/ui/button";
import { useDeleteCartItem } from "@/hooks/useDeleteCartItem";
import { TfiClose } from "react-icons/tfi";

const RemoveItemFromCart = ({ cartItemId }: { cartItemId: string }) => {
  const deleteCartItem = useDeleteCartItem();

  return (
    <Button
      className="cursor-pointer outline-none border-none bg-transparent shadow-none p-0"
      title="Usuń z koszyka"
      onClick={() => deleteCartItem(cartItemId)}
    >
      <TfiClose size={20} color="black" />
    </Button>
  );
};
export default RemoveItemFromCart;
