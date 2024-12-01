import { useState } from "react";

const Features = () => {
  const [features, setFeatures] = useState<string[]>([]);
  const [value, setValue] = useState("");

  // add item
  const addItem = () => {
    setFeatures((prev) => [...prev, value]);
    setValue("");
  };

  return (
    <section className="border-t-2 border-green-700 mt-8">
      <h2 className="text-2xl font-bold mt-3 mb-8">Cechy produktu</h2>

      <div className="flex items-start justify-between max-w-[40rem]">
        <div className="space-y-3">
          {/* value */}
          <div>
            <label htmlFor="value" className="custom-label">
              cecha produktu
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
            className="capitalize bg-green-700 text-white px-4 py-1 border-2 border-black hover:scale-105 duration-300"
            onClick={addItem}
          >
            add
          </button>
        </div>

        {/* features */}
        <ul className="list-disc marker:text-green-700">
          {features.map((item, index) => {
            return (
              <li key={index} className="font-semibold">
                <span className="capitalize">{item}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
export default Features;
