import CreateOrderBtn from "@/routes/order-summary/components/CreateOrderBtn";
import CheckoutBtn from "./CheckoutBtn";
import RemoveBtn from "./RemoveBtn";
import { useLocation } from "react-router";
import GoBackBtn from "@/routes/order-summary/components/GoBackBtn";

const Checkout = () => {
  const isOrderSummary = useLocation().pathname === "/order-summary";

  return (
    <div className="py-8 flex flex-col md:flex-row gap-y-2 justify-between">
      {/* remove all items button  */}
      {isOrderSummary ? <GoBackBtn /> : <RemoveBtn />}
      {isOrderSummary ? <CreateOrderBtn /> : <CheckoutBtn />}
    </div>
  );
};
export default Checkout;
