import AdditionalInfo from "./AdditionalInfo";
import AddToCart from "./AddToCart";
import Amount from "./Amount";
import Delivery from "./Delivery";
import Price from "./Price";

type MainInfoProps = {
  category: string;
  price: number;
};

const MainInfo = ({ category, price }: MainInfoProps) => {
  return (
    <div className="mt-8 md:mt-0">
      <Price category={category} price={price} />
      <Amount />
      <Delivery />
      <AddToCart />
      <AdditionalInfo />
    </div>
  );
};
export default MainInfo;
