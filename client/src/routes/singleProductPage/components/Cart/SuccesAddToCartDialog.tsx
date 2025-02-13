import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { capitalizeFirstLetter, formatToPLN } from "@/utils/functions";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Link } from "react-router";

type SuccessAddToCartDialogProps = {
  open: boolean;
  onOpenChange: () => void;
  name: string;
  price: number;
  image: string;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

function SuccessAddToCartDialog({
  open,
  onOpenChange,
  name,
  price,
  image,
  quantity,
  setQuantity,
}: SuccessAddToCartDialogProps) {
  const closeDialog = () => {
    onOpenChange();
    setQuantity(1);
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog} modal>
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Dodano do koszyka:
          </DialogTitle>
          <VisuallyHidden>
            <DialogDescription className="text-sm text-muted-foreground">
              Dodałeś produkt do koszyka. Możesz teraz przejść do koszyka, aby
              dokonać zakupu lub kontynuować zakupy.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <DialogProduct
          name={name}
          image={image}
          price={price}
          quantity={quantity}
        />
        <Link to="/cart" className="place-self-center">
          <Button className="mt-14 text-white tracking-wider px-10 bg-red-900 border border-red-900 hover:text-red-900 hover:bg-white duration-300">
            Koszyk
          </Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessAddToCartDialog;

type DialogProductProps = {
  name: string;
  image: string;
  price: number;
  quantity: number;
};
const DialogProduct = ({
  image,
  name,
  price,
  quantity,
}: DialogProductProps) => {
  return (
    <div>
      <div className="flex my-6 gap-6">
        <div className="flex gap-5">
          <div className="w-24 h-24 mx-auto rounded-sm overflow-hidden">
            <img
              src={image}
              alt={name}
              className="max-w-full max-h-full object-cover"
            />
          </div>
          <h4 className="text-lg font-semibold">
            {capitalizeFirstLetter(name)}
          </h4>
        </div>
        <span className="text-md text-muted-foreground mt-[2px]">
          {formatToPLN(price)}
        </span>
      </div>
      <span className="text-xl font-semibold">Ilość: {quantity}</span>
    </div>
  );
};
