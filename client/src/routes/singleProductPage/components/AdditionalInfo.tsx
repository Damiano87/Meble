import { FaTruck } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { FaRegCalendarCheck } from "react-icons/fa";

const AdditionalInfo = () => {
  return (
    <div className="mt-6 space-y-1">
      {/* truck */}
      <div className="flex gap-4 items-center bg-orange-300 p-3">
        <FaTruck size={30} />
        <span>
          <b>Dostawa</b>
          <span className="text-red-900 ml-2">Gratis</span>
        </span>
      </div>
      {/* return */}
      <div className="flex gap-4 items-center bg-orange-300 p-3">
        <GiReturnArrow size={30} />
        <span>
          <b>Prawo zwrotu</b>
          <span className="text-red-900 ml-2">365 dni</span>
        </span>
      </div>
      {/* calendar */}
      <div className="flex gap-4 items-center bg-orange-300 p-3">
        <FaRegCalendarCheck size={30} />
        <div className="space-y-2">
          <b>Dostępne:</b>
          <span className="block text-white bg-green-700 px-2 rounded-sm">
            Natychmiastowa darmowa wysyłka
          </span>
          <p className="text-[.8rem]">
            <span>
              Przewidywana dostawa w ciągu 3 dni <br /> roboczych, do 19.12.2024
              (czwartek)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
