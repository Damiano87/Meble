import { useState, useEffect } from "react";

const AdditionalInfo = () => {
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [value, setValue] = useState("");

  // add item
  const addItem = () => {
    setAdditionalInfo(value);
    setValue("");
  };

  // Obserwuj zmiany w additionalInfo
  useEffect(() => {
    console.log(additionalInfo);
  }, [additionalInfo]);

  return (
    <section className="border-t-2 border-black mt-14">
      <h2 className="text-2xl font-bold mt-3 mb-8">Informacje dodatkowe</h2>

      <div className="flex flex-col md:flex-row items-start gap-5">
        <div className="space-y-3 w-full max-w-[40rem]">
          {/* value */}
          <div>
            <label htmlFor="value" className="custom-label">
              info
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

        {/* additionalInfo */}
        <p className="break-words w-full md:w-[20rem] lg:w-full max-w-[35rem] text-slate-500 mt-5 md:mt-0">
          {additionalInfo}
        </p>
      </div>
    </section>
  );
};
export default AdditionalInfo;
