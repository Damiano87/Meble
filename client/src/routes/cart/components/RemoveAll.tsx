import { Button } from "@/components/ui/button";
import { useDeleteAllCartItems } from "@/hooks/useDeleteAllCartItems";

const RemoveAll = () => {
  const { deleteAllCartItems, isDeleting } = useDeleteAllCartItems();

  return (
    <div className="py-8 flex justify-between">
      {/* remove all items button  */}
      <Button
        className="bg-white text-red-900 hover:text-white hover:bg-red-900 border border-red-900 duration-500 px-7"
        disabled={isDeleting}
        onClick={() => deleteAllCartItems()}
      >
        {isDeleting ? "Usuwanie..." : "Usuń"}
      </Button>
      {/* checkout button */}
      <Button className="bg-red-900 text-white hover:text-red-900 hover:border-red-900 border duration-500 px-7">
        Do kasy
      </Button>
    </div>
  );
};
export default RemoveAll;
