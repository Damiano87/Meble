import { Order } from "@/utils/types";

const OrderItem = ({
  id,
  createdAt,
  paymentStatus,
  status,
  totalAmount,
  userId,
}: Order) => {
  return <div>{paymentStatus}</div>;
};
export default OrderItem;
