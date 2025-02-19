import { OrderDetails } from "@/utils/types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

type PaymentSuccessfullProps = {
  success: boolean;
  orderDetails: OrderDetails;
};
const PaymentSuccessfull = ({
  success,
  orderDetails,
}: PaymentSuccessfullProps) => {
  const [timeLeft, setTimeLeft] = useState(10);

  const navigate = useNavigate();

  // redirect to home page after 10 seconds if payment is successful
  useEffect(() => {
    if (!success || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);

      if (timeLeft === 1) {
        navigate("/");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, success, navigate]);

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
        Zostaniesz automatycznie przekierowany do strony głównej za {timeLeft}{" "}
        {timeLeft === 1 ? "sekundę" : timeLeft < 5 ? "sekundy" : "sekund"}.
      </p>
    </div>
  );
};
export default PaymentSuccessfull;
