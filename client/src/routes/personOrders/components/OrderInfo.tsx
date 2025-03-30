import { formatToPLN, getLocalDate } from "@/utils/functions";
import { FaLongArrowAltRight } from "react-icons/fa";

type OrderInfoProps = {
  id: string;
  createdAt: Date;
  status: string;
  statusHistory: string[];
  paymentStatus: string;
  totalAmount: number;
  history?: boolean;
};
const OrderInfo = ({
  id,
  createdAt,
  status,
  statusHistory,
  paymentStatus,
  totalAmount,
  history,
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

  // rename status history
  const renamestatusHistory = (item: string): string => {
    return item === "PENDING"
      ? "W toku"
      : item === "COMPLETED"
      ? "Zakończony"
      : "Anulowany";
  };

  return (
    <div className="flex flex-col">
      <span>Numer zamówienia: {id}</span>
      <span>Data utworzenia: {getLocalDate(createdAt)}</span>
      <div className="flex gap-2">
        <span>Status: </span>
        <span className={setStatus(status, true)}>{setStatus(status)}</span>
      </div>
      {history && (
        <div className="flex gap-2">
          <span>Historia statusów: </span>
          <div className="flex gap-2">
            {statusHistory?.map((item, index) => {
              return (
                <span key={index} className="flex items-center gap-2 italic">
                  {renamestatusHistory(item)}
                  {!(statusHistory.length - 1 === index) ? (
                    <FaLongArrowAltRight />
                  ) : null}
                </span>
              );
            })}
          </div>
        </div>
      )}
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
