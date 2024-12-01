import { useState } from "react";

type Detail = {
  key: string;
  value: string;
};

const Details = () => {
  const [details, setDetails] = useState<Detail[]>([]);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  // add item
  const addItem = () => {
    setDetails((prev) => [...prev, { key: key, value: value }]);
    setKey("");
    setValue("");
  };

  return (
    <section className="border-t-2 border-amber-500 mt-8">
      <h2 className="text-2xl font-bold mt-3 mb-8">Szczegóły</h2>

      <div className="flex flex-col sm:flex-row items-start justify-between max-w-[40rem]">
        <div className="space-y-3">
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
            className="capitalize bg-amber-500 text-white px-4 py-1 border-2 border-black hover:scale-105 duration-300"
            onClick={addItem}
          >
            add
          </button>
        </div>

        {/* details */}
        <ul className="mt-8 md:mt-0">
          {details.map((item, index) => {
            return (
              <li key={index} className="font-semibold">
                <span className="capitalize">{item.key}</span>:{" "}
                <span className="capitalize ml-3">{item.value}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
export default Details;
