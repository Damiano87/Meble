import { Button } from "@/components/ui/button";
import { useDeleteAllCartItems } from "@/hooks/cart/useDeleteAllCartItems";

const RemoveBtn = () => {
  const { deleteAllCartItems, isDeleting } = useDeleteAllCartItems();

  return (
    <Button
      className="bg-white text-red-900 hover:text-white hover:bg-red-900 border border-red-900 duration-500 px-7"
      disabled={isDeleting}
      onClick={() => deleteAllCartItems()}
    >
      {isDeleting ? "Usuwanie..." : "Usuń"}
    </Button>
  );
};
export default RemoveBtn;
