import { useState } from "react";

const Resistance = () => {
  const [resistList, setResistList] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [desc, setDesc] = useState("");
  const [descDisplay, setDescDisplay] = useState("");

  // add item
  const addItem = () => {
    setResistList((prevList) => {
      const newList = value.trim() ? [...prevList, value.trim()] : prevList;
      return newList;
    });
    setDescDisplay(desc);
    setValue("");
    setDesc("");
  };

  return (
    <section className="border-t-[5px] border-black mt-14">
      <h2 className="text-2xl font-bold mt-3 mb-8">Odporność</h2>

      <div className="flex flex-col md:flex-row items-start justify-between max-w-[70rem]">
        <div className="space-y-3 w-full">
          {/* value */}
          <div>
            <label htmlFor="value" className="custom-label">
              odporność na:
            </label>
            <input
              type="text"
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="custom-input input input-bordered"
            />
          </div>
          {/* description */}
          <div>
            <label htmlFor="description" className="custom-label">
              opis
            </label>
            <textarea
              id="description"
              rows={5}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className={`textarea textarea-bordered border-2 border-black w-full max-w-[40rem] focus:outline-none focus:border-amber-500`}
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

        {/* resistList */}
        <div className="space-y-5 px-5 mt-5">
          <ul className="list-disc">
            {resistList.map((item, index) => {
              if (item === "") return null;
              return (
                <li key={index} className="font-semibold">
                  <span className="capitalize">{item}</span>
                </li>
              );
            })}
          </ul>
          <p className="break-words w-full max-w-[15rem]">{descDisplay}</p>
        </div>
      </div>
    </section>
  );
};
export default Resistance;
