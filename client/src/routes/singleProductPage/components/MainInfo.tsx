import AddToCart from "./AddToCart";
import Amount from "./Amount";

type MainInfoProps = {
  category: string;
  price: number;
};

const MainInfo = ({ category, price }: MainInfoProps) => {
  return (
    <div className="md:flex flex-col justify-between bg-slate-300 p-4 md:p-7 mt-8 md:mt-0">
      <div>
        <p className="text-[1.2rem] font-semibold">
          Kategoria: <span className="capitalize">{category}</span>
        </p>
      </div>
      <Amount price={price} />
      <AddToCart />
    </div>
  );
};
export default MainInfo;
