import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Link } from "react-router";

type ErrorAddToCartDialogProps = {
  open: boolean;
  onOpenChange: () => void;
  setQuantity: (number: number) => void;
};

function ErrorAddToCartDialog({
  open,
  onOpenChange,
  setQuantity,
}: ErrorAddToCartDialogProps) {
  const closeDialog = () => {
    onOpenChange();
    setQuantity(1);
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog} modal>
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-background p-6 shadow-lg duration-200 grid grid-rows-[auto,auto] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Musisz być zalogowany aby dodać produkt do koszyka
          </DialogTitle>
          <VisuallyHidden>
            <DialogDescription className="text-sm text-muted-foreground">
              Musisz być zalogowany aby dodać produkt do koszyka.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <Link to="/login" className="place-self-center">
          <Button className="mt-14 text-white tracking-wider px-10 bg-red-900 border border-red-900 hover:text-red-900 hover:bg-white duration-300">
            Zaloguj się
          </Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
}

export default ErrorAddToCartDialog;
