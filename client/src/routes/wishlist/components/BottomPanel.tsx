import { Button } from "@/components/ui/button";
import ClearWishlistBtn from "./ClearWishlistBtn";

const BottomPanel = () => {
  return (
    <div className="flex justify-between">
      <ClearWishlistBtn />
      <div className="flex gap-4">
        <Button
          variant={"secondary"}
          className="border border-red-900 text-white bg-red-900 hover:text-red-900 duration-500 rounded-sm"
        >
          Przenieś wszystkie produkty do koszyka
        </Button>
        <Button
          variant={"secondary"}
          className="border border-red-900 text-red-900 hover:bg-red-900 hover:text-white duration-500 rounded-sm"
        >
          Wyślij mailem
        </Button>
      </div>
    </div>
  );
};
export default BottomPanel;
