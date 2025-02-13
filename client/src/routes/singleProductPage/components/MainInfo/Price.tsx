import { formatToPLN } from "../../../../utils/functions";

type PriceProps = {
  category: string;
  price: number;
};

const Price = ({ category, price }: PriceProps) => {
  return (
    <div>
      <p className="text-[1.2rem] font-semibold">
        Kategoria: <span className="capitalize">{category}</span>
      </p>
      <span className="block text-[1.8rem] mt-3 font-semibold">
        {formatToPLN(price)}
      </span>
      <p className="font-medium my-2">zawiera VAT</p>
      <div className="border p-3">Rata od 315,27 zł PLN / mies.</div>
    </div>
  );
};
export default Price;
