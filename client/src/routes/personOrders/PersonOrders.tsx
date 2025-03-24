import { useGetUserOrders } from "@/hooks/orders/useGetUserOrders";
import OrdersList from "./components/OrdersList";
import LoadingIndicator from "@/components/LoadingIndicator";
import FilterOrders from "./components/FilterOrders";
import { useSearchParams } from "react-router";

const PersonOrders = () => {
  const [searchParams] = useSearchParams();

  // get url params for filtering
  const queryParams = {
    status: searchParams.get("status") || undefined,
    sort: searchParams.get("sort") || undefined,
  };

  const { orders, isFetchingOrders, error } = useGetUserOrders(queryParams);

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
      <FilterOrders />
      <OrdersList orders={orders} />
    </div>
  );
};
export default PersonOrders;
