import { Order } from "@/utils/types";
import OrderItem from "./OrderItem";

const OrdersList = ({ orders }: { orders: Order[] }) => {
  return (
    <div className="space-y-4">
      {orders?.map((order) => {
        return <OrderItem key={order.id} {...order} />;
      })}
    </div>
  );
};
export default OrdersList;
