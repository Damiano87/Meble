import { Order } from "@/utils/types";
import { Link } from "react-router";
import SubOrderItem from "./SubOrderItem";
import OrderInfo from "./OrderInfo";

const OrderItem = ({ order }: { order: Order }) => {
  return (
    <div className="border-b-2 pb-6 mb-6">
      <div className="w-fit">
        <Link to={`/person_orders/${order.id}`}>
          <OrderInfo key={order.id} {...order} history={false} />
          <div className="mt-4 space-y-3">
            {order?.orderItems?.map((orderItem) => {
              return <SubOrderItem key={orderItem.id} orderItem={orderItem} />;
            })}
          </div>
        </Link>
      </div>
    </div>
  );
};
export default OrderItem;
