import { useNavigate } from "react-router";

const PaymentNotSuccesfull = ({ message }: { message?: string }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto pt-52 p-6 bg-yellow-50 rounded shadow">
      <h1 className="text-2xl font-bold text-yellow-700">
        Płatność nie została zakończona pomyślnie
      </h1>
      <p className="mt-4">
        {message ||
          "Prosimy spróbować ponownie lub skontaktować się z obsługą klienta."}
      </p>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => navigate("/cart")}
      >
        Wróć do koszyka
      </button>
    </div>
  );
};
export default PaymentNotSuccesfull;
