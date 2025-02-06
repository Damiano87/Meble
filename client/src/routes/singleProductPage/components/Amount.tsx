type AmountProps = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

const Amount = ({ quantity, setQuantity }: AmountProps) => {
  // increment quantity function
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  // decrement quantity function
  const decrement = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  return (
    <div className="flex flex-[1] items-center h-full">
      <button
        onClick={decrement}
        className="flex justify-center items-center border border-red-900 text-red-900 bg-white hover:bg-slate-300 duration-300 w-full text-[1.3rem] py-[3px] cursor-pointer"
      >
        -
      </button>
      <p className="grid place-content-center border border-l-0 border-r-0 border-red-900 text-red-900 text-[1.3rem] py-[3px] w-full">
        {quantity}
      </p>
      <button
        onClick={increment}
        className="flex justify-center items-center border border-red-900 text-red-900 bg-white hover:bg-slate-300 duration-300 w-full text-[1.3rem] py-[3px] cursor-pointer"
      >
        +
      </button>
    </div>
  );
};
export default Amount;
