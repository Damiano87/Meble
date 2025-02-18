import { OrderDetails } from "@/utils/types";
import { useNavigate } from "react-router";

const PaymentSuccessfull = ({
  orderDetails,
}: {
  orderDetails: OrderDetails;
}) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto pt-52 p-6 bg-green-50 rounded shadow">
      <h1 className="text-2xl font-bold text-green-700">
        Dziękujemy za płatność!
      </h1>

      {orderDetails && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Szczegóły zamówienia:</h2>
          <p className="py-1">
            <span className="font-medium">Numer zamówienia:</span>{" "}
            {orderDetails.orderId}
          </p>
          <p className="py-1">
            <span className="font-medium">Kwota:</span> {orderDetails.amount}{" "}
            {orderDetails.currency}
          </p>
          {orderDetails.customer && (
            <p className="py-1">
              <span className="font-medium">Email:</span>{" "}
              {orderDetails.customer}
            </p>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row sm:justify-between gap-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate("/")}
        >
          Kontynuuj zakupy
        </button>

        {orderDetails?.orderId && (
          <button
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
            onClick={() => navigate(`/orders/${orderDetails.orderId}`)}
          >
            Zobacz szczegóły zamówienia
          </button>
        )}
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Zostaniesz automatycznie przekierowany do strony głównej za 10 sekund.
      </p>
    </div>
  );
};
export default PaymentSuccessfull;
