import { useState } from "react";

type Detail = {
  name: string;
  points: string[];
};

const CareTips = () => {
  const [tips, setTips] = useState<Detail[]>([]);
  const [points, setPoints] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  // add item
  const addItem = () => {
    setPoints((prev) => [...prev, value]);
    setTips((prev) => [...prev, { name: name, points: points }]);
    setName("");
    setValue("");
  };

  return (
    <section className="border-t-2 border-black mt-8">
      <h2 className="text-2xl font-bold mt-3 mb-8">
        Wskazówki dotyczące pielęgnacji
      </h2>

      <div className="flex flex-col sm:flex-row w-full items-start justify-between max-w-[50rem]">
        <div className="space-y-3 w-full">
          {/* name */}
          <div>
            <label htmlFor="name" className="custom-label">
              nazwa
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="custom-input input input-bordered"
            />
          </div>
          {/* value */}
          <div className="w-full">
            <label htmlFor="value" className="custom-label">
              wskazówka
            </label>
            <textarea
              rows={5}
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="textarea textarea-bordered w-full border-2 border-black focus:outline-none focus:border-amber-500 max-w-[40rem]"
            />
          </div>

          <button
            type="button"
            className="capitalize bg-black text-white px-4 py-1 border-2 border-black hover:scale-105 duration-300"
            onClick={addItem}
          >
            add
          </button>
        </div>

        {/* tips */}
        <ul className="mt-8 md:mt-0">
          {tips.map((item, index) => {
            return (
              <li key={index} className="font-semibold">
                <span className="capitalize">{item.name}</span>
                <ul>
                  {item.points.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
export default CareTips;
