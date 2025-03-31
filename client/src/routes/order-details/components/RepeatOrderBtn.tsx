import { Button } from "@/components/ui/button";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { SubOrderItem } from "@/utils/types";
import toast from "react-hot-toast";

const RepeatOrderBtn = ({ orderItems }: { orderItems: SubOrderItem[] }) => {
  const { mutate: addToCart, isPending } = useAddToCart();

  // add to cart
  const addOrderItemsToCart = async () => {
    try {
      Promise.all(
        orderItems.map(
          (item) =>
            new Promise<void>((resolve, reject) => {
              addToCart(
                {
                  productId: item.productId,
                  quantity: item.quantity,
                },
                {
                  onSuccess: () => {
                    resolve();
                    toast.success(
                      "Wszystkie produkty zostały dodane do koszyka!"
                    );
                  },
                  onError: (error) => {
                    reject(error);
                    toast.error(
                      "Nie udało się dodać niektórych produktów do koszyka."
                    );
                  },
                }
              );
            })
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      variant={"secondary"}
      disabled={isPending}
      className="bg-red-900 text-white border border-red-900 hover:text-red-900"
      onClick={addOrderItemsToCart}
    >
      {isPending ? "Dodawanie..." : "Powtórz zamówienie"}
    </Button>
  );
};
export default RepeatOrderBtn;
