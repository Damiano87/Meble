import { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "../../../utils/functions";

type Detail = {
  key: string;
  value: string;
};

const MaterialDetails = () => {
  const [materialDetails, setMaterialDetails] = useState<Detail[]>([]);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  // add item
  const addItem = () => {
    setMaterialDetails((prev) => [...prev, { key: key, value: value }]);
    setKey("");
    setValue("");
  };

  useEffect(() => {
    console.log(materialDetails);
  }, [materialDetails]);

  return (
    <section className="border-t-2 border-black mt-14">
      <h2 className="text-2xl font-bold mt-3 mb-8">Szczegóły materiału</h2>

      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="space-y-3 w-full max-w-[40rem]">
          {/* key */}
          <div>
            <label htmlFor="key" className="custom-label">
              klucz
            </label>
            <input
              type="text"
              id="key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="custom-input input input-bordered"
            />
          </div>

          {/* value */}
          <div>
            <label htmlFor="value" className="custom-label">
              wartość
            </label>
            <input
              type="text"
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="custom-input input input-bordered"
            />
          </div>

          <button
            type="button"
            className="capitalize bg-white text-black px-4 py-1 border-2 border-black hover:scale-105 duration-300"
            onClick={addItem}
          >
            add
          </button>
        </div>

        {/* materialDetails */}
        <ul className="px-5 mt-5">
          {materialDetails.map((item, index) => {
            return (
              <li key={index} className="font-semibold">
                <span className="">{capitalizeFirstLetter(item.key)}</span>:{" "}
                <span className="ml-3">
                  {capitalizeFirstLetter(item.value)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
export default MaterialDetails;
