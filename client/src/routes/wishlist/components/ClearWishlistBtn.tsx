import { Button } from "@/components/ui/button";

const ClearWishlistBtn = () => {
  return (
    <Button
      variant={"secondary"}
      className="border border-red-900 text-red-900 hover:bg-red-900 hover:text-white duration-500 rounded-sm"
    >
      Wyczyść listę życzeń
    </Button>
  );
};
export default ClearWishlistBtn;
