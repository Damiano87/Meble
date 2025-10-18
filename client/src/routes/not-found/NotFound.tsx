import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <div className="w-52 sm:w-72 aspect-square">
          <img
            src="/images/svg/undraw-not-found.svg"
            alt="Nie znaleziono strony"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-center text-lg font-semibold">
          Strona nie istnieje
        </h1>
        <Link
          to="/"
          className="text-lg text-center font-semibold border border-amber-600 bg-amber-600 text-white px-5 py-2 hover:bg-amber-700 transition-colors"
        >
          Wróć do strony głównej
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
