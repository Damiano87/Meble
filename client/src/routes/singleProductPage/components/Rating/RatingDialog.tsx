import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import RateProduct from "./RateProduct";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

function RatingDialog({ id }: { id: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-[1.2rem] text-amber-600 border border-amber-600 hover:text-amber-800 hover:border-amber-800 mt-6"
        >
          Oceń produkt
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Oceń produkt</DialogTitle>
            <DialogDescription>
              Oceń produkt, aby pomóc innym użytkownikom w wyborze.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <RateProduct productId={id} />
      </DialogContent>
    </Dialog>
  );
}

export default RatingDialog;
