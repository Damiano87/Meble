import {
  capitalizeFirstLetter,
  formatToPLN,
  getLocalDate,
} from "@/utils/functions";
import { Order } from "@/utils/types";

const OrderItem = ({
  id,
  createdAt,
  paymentStatus,
  status,
  totalAmount,
  orderItems,
}: Order) => {
  // set status text and text color
  const setStatus = (status: string, isColor?: boolean) => {
    switch (status) {
      case "COMPLETED":
        return isColor ? "text-lime-700" : "Zakończony";
      case "PENDING":
        return isColor ? "text-blue-500" : "W toku";
      case "CANCELLED":
        return isColor ? "text-red-600" : "Anulowany";
      // cases for payment status
      case "PAID":
        return isColor ? "text-lime-700" : "Zapłacone";
      case "FAILED":
        return isColor ? "text-red-600" : "Niepowodzenie";
    }
  };

  return (
    <div className="border-b-2 pb-6">
      <div className="flex flex-col">
        <span>Numer zamówienia: {id}</span>
        <span>Data utworzenia: {getLocalDate(createdAt)}</span>
        <div className="flex gap-2">
          <span>Status: </span>
          <span className={setStatus(status, true)}>{setStatus(status)}</span>
        </div>
        <div className="flex gap-2">
          <span>Status płatności: </span>
          <span className={setStatus(paymentStatus, true)}>
            {setStatus(paymentStatus)}
          </span>
        </div>
        <div>
          <span>Wartość zamówienia: </span>
          <span className="font-semibold">{formatToPLN(totalAmount)}</span>
        </div>
        <div className="mt-4 space-y-3">
          {orderItems?.map((orderItem) => {
            return (
              <div
                key={orderItem.id}
                className="flex gap-4 font-semibold border-2 p-2 max-w-[25rem]"
              >
                <div className="w-14 aspect-square">
                  <img
                    src={orderItem.product.images[0]}
                    alt={orderItem.product.name}
                    className="object-cover max-w-full max-h-full mx-auto"
                  />
                </div>
                <div>
                  <span>{capitalizeFirstLetter(orderItem.product.name)}</span>
                  <span className="block">
                    <span className="font-normal">Ilość: </span>
                    {orderItem.quantity}
                  </span>
                </div>
                <span className="ml-auto">
                  {formatToPLN(orderItem.product.price)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default OrderItem;
