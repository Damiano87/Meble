import { Button } from "@/components/ui/button";
import { useCreateOrder } from "@/hooks/orders/useCreateOrder";
import { useCheckout } from "@/hooks/stripe/useCheckout";

const CreateOrderBtn = () => {
  const { createOrder, isCreatingOrder } = useCreateOrder();
  const { checkout } = useCheckout();

  // create order
  const create = async () => {
    try {
      const newOrder = await createOrder();
      checkout({ orderId: newOrder.orderId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      variant={"secondary"}
      disabled={isCreatingOrder}
      className="bg-red-900 text-white hover:text-red-900 hover:border-red-900 border duration-500 px-7"
      onClick={create}
    >
      {isCreatingOrder ? "Przetwarzanie..." : "Złóż zamówienie"}
    </Button>
  );
};
export default CreateOrderBtn;
