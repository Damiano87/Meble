import { CareTip } from "@/utils/types";

const CareTips = ({ careTips }: { careTips: CareTip[] }) => {
  return (
    <div className="flex-1">
      <h3 className="text-[1.4rem] font-semibold mb-2">
        Wskazówki dotyczące pielęgnacji
      </h3>
      <ul className="space-y-3">
        {careTips.map((careTip) => {
          return <CareTipItem key={careTip.tip} careTip={careTip} />;
        })}
      </ul>
    </div>
  );
};
export default CareTips;

const CareTipItem = ({ careTip }: { careTip: CareTip }) => (
  <li>
    <p>{careTip.tip}</p>
    {careTip?.list?.length > 0 && (
      <ul className="list-['-_']">
        {careTip?.list?.map((subTip, index) => (
          <li key={`${careTip.tip}-${index}`} className="ml-4">
            {subTip}
          </li>
        ))}
      </ul>
    )}
  </li>
);
