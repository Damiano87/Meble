import { Button } from "@/components/ui/button";
import { useCancellOrder } from "@/hooks/orders/useCancellOrder";

const CancellOrderBtn = ({ orderId }: { orderId: string }) => {
  const { cancellOrder, isCancelling } = useCancellOrder(orderId);
  return (
    <Button
      variant={"secondary"}
      disabled={isCancelling}
      className="bg-red-900 text-white border border-red-900 hover:text-red-900"
      onClick={() => cancellOrder(orderId)}
    >
      {isCancelling ? "Anulowanie..." : "Anuluj zamówienie"}
    </Button>
  );
};
export default CancellOrderBtn;
