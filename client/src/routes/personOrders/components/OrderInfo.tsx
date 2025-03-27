import { formatToPLN, getLocalDate } from "@/utils/functions";

type OrderInfoProps = {
  id: string;
  createdAt: Date;
  status: string;
  paymentStatus: string;
  totalAmount: number;
};
const OrderInfo = ({
  id,
  createdAt,
  status,
  paymentStatus,
  totalAmount,
}: OrderInfoProps) => {
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
    </div>
  );
};
export default OrderInfo;
