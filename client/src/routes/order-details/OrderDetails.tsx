import { useGetOrderDetails } from "@/hooks/orders/useGetOrderDetails";
import { useParams } from "react-router";
import OrderInfo from "../personOrders/components/OrderInfo";
import SubOrderItem from "../personOrders/components/SubOrderItem";
import LoadingIndicator from "@/components/LoadingIndicator";
import ShippingAddress from "../order-summary/components/ShippingAddress";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { orderDetails, isFetchingOrderDetails, error } =
    useGetOrderDetails(orderId);

  console.log(orderDetails);
  if (!orderId) {
    return (
      <div className="pt-44 max-w-7xl mx-auto px-4 h-screen">
        <p>Nie znaleziono identyfikatora zamówienia...</p>
      </div>
    );
  }

  if (isFetchingOrderDetails) {
    return (
      <div className="h-screen">
        <LoadingIndicator />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-44 max-w-7xl mx-auto px-4 h-screen">
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <div className="pt-44 max-w-7xl mx-auto px-4">
      <OrderInfo key={orderDetails.id} {...orderDetails} />
      <div className="space-y-4 mt-4">
        {orderDetails?.orderItems?.map((subOrderItem) => {
          return (
            <SubOrderItem key={subOrderItem.id} orderItem={subOrderItem} />
          );
        })}
      </div>
      <ShippingAddress />
    </div>
  );
};
export default OrderDetails;
