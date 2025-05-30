import { useGetOrderDetails } from "@/hooks/orders/useGetOrderDetails";
import { useParams } from "react-router";
import OrderInfo from "../personOrders/components/OrderInfo";
import SubOrderItem from "../personOrders/components/SubOrderItem";
import LoadingIndicator from "@/components/LoadingIndicator";
import ShippingAddress from "../order-summary/components/ShippingAddress";
import { Order } from "@/utils/types";
import CancellOrderBtn from "./components/CancellOrderBtn";
import { Toaster } from "react-hot-toast";
import RepeatOrderBtn from "./components/RepeatOrderBtn";
import GoBack from "./components/GoBack";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { orderDetails, isFetchingOrderDetails, error } = useGetOrderDetails(
    orderId
  ) as {
    orderDetails: Order;
    isFetchingOrderDetails: boolean;
    error: Error | null;
  };

  if (!orderDetails) {
    return <GoBack />;
  }

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
    <div className="pt-44 max-w-7xl mx-auto px-4 space-y-6">
      <Toaster />
      <OrderInfo key={orderDetails.id} {...orderDetails} history={true} />
      <div className="space-y-4 mt-4">
        {orderDetails?.orderItems?.map((subOrderItem) => {
          return (
            <SubOrderItem key={subOrderItem.id} orderItem={subOrderItem} />
          );
        })}
      </div>
      <ShippingAddress />
      <div className="flex flex-col w-full max-w-[15rem] gap-y-3">
        {orderDetails?.status === "PENDING" && (
          <CancellOrderBtn orderId={orderDetails.id} />
        )}
        <RepeatOrderBtn orderItems={orderDetails.orderItems} />
      </div>
    </div>
  );
};
export default OrderDetails;
