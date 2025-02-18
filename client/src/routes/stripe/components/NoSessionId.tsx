import { useNavigate } from "react-router";

const NoSessionId = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto pt-52 p-6 bg-red-50 rounded shadow">
      <h1 className="text-2xl font-bold text-red-700">
        Błąd weryfikacji płatności
      </h1>
      <p className="mt-4">
        Brak ID sesji płatności. Spróbuj ponownie lub skontaktuj się z obsługą
        klienta.
      </p>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => navigate("/")}
      >
        Wróć do strony głównej
      </button>
    </div>
  );
};
export default NoSessionId;
