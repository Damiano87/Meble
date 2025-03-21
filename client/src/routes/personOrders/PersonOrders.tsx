import { useGetUserOrders } from "@/hooks/orders/useGetUserOrders";
import OrdersList from "./components/OrdersList";
import LoadingIndicator from "@/components/LoadingIndicator";

const PersonOrders = () => {
  const { orders, isFetchingOrders, error } = useGetUserOrders();

  if (!orders) {
    return null;
  }

  if (isFetchingOrders) return <LoadingIndicator />;

  if (error) {
    return (
      <div className="pt-44 max-w-7xl mx-auto px-4">
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <div className="pt-44 max-w-7xl mx-auto px-4">
      <OrdersList orders={orders} />
    </div>
  );
};
export default PersonOrders;
