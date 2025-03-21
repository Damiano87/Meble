import { Order } from "@/utils/types";
import OrderItem from "./OrderItem";

const OrdersList = ({ orders }: { orders: Order[] }) => {
  console.log(orders);
  return (
    <div>
      {orders?.map((order) => {
        return <OrderItem key={order.id} {...order} />;
      })}
    </div>
  );
};
export default OrdersList;
