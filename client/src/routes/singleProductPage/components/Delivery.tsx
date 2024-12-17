import { useState } from "react";

const tooltip =
  "Proces dostawy rozpoczynamy niezwłocznie po otrzymaniu płatności. Jednakże ostateczna dostawa zależy od dostępności towaru w naszym magazynie oraz braku jakichkolwiek opóźnień.";

const Delivery = () => {
  return (
    <div className="mt-5 space-y-4">
      {/* first checkbox */}
      <label
        title={tooltip}
        className="flex items-center cursor-pointer hover:underline"
      >
        <Checkbox />

        <span className="ml-2 font-medium">Dostawa standardowa</span>
        <span className="ml-2 text-red-900">Gratis</span>
      </label>

      {/* second checkbox */}
      <label className="flex items-center cursor-pointer hover:underline">
        <Checkbox />

        <span className="ml-2 font-medium">
          Dostawa PREMIUM (wniesienie i <br /> rozpakowanie + 149,-)
        </span>
      </label>
    </div>
  );
};

export default Delivery;

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        className="hidden"
      />
      <span
        className={`
          w-4 h-4 
          border-2 
          rounded-full 
          border-black
          flex items-center justify-center
          bg-white
        `}
      >
        <span
          className={`${
            isChecked ? "visible" : "invisible"
          } w-2 h-2 bg-black rounded-full`}
        ></span>
      </span>
    </div>
  );
};
