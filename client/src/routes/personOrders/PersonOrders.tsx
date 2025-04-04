import { useGetUserOrders } from "@/hooks/orders/useGetUserOrders";
import OrdersList from "./components/OrdersList";
import LoadingIndicator from "@/components/LoadingIndicator";
import FilterOrders from "./components/FilterOrders";
import { Navigate, useLocation, useSearchParams } from "react-router";
import SearchOrders from "./components/SearchOrders";
import ResetAllFilters from "./components/ResetAllFilters";
import { useAuth } from "@/hooks/auth/useAuth";

const PersonOrders = () => {
  const { username } = useAuth();

  const [searchParams] = useSearchParams();
  const location = useLocation();
  // get url params for filtering
  const queryParams = {
    status: searchParams.get("status") || undefined,
    sort: searchParams.get("sort") || undefined,
    price: searchParams.get("price") || undefined,
    productName: searchParams.get("productName") || undefined,
  };

  const { orders, isFetchingOrders, error } = useGetUserOrders(queryParams);

  if (!username) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (isFetchingOrders)
    return (
      <div className="h-screen">
        <LoadingIndicator />
      </div>
    );

  if (error) {
    return (
      <div className="pt-44 max-w-7xl mx-auto px-4">
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="pt-44 max-w-7xl mx-auto px-4">
      <div className="flex gap-14 justify-end">
        <ResetAllFilters />
        <SearchOrders />
      </div>
      <FilterOrders />
      {orders?.length === 0 ? (
        <div>
          <p className="text-[1.2rem] font-medium">
            Nie znaleziono żadnych zamówień...
          </p>
        </div>
      ) : (
        <OrdersList orders={orders} />
      )}
    </div>
  );
};
export default PersonOrders;
