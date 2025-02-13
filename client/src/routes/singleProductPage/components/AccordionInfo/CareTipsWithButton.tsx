import { CareTip } from "@/utils/types";
import CollapsibleButton from "./CollapsibleButton";
import { useState } from "react";

const CareTips = ({ careTips }: { careTips: CareTip[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <CollapsibleButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Wskazówki dotyczące pielęgnacji"
      />
      {isOpen && (
        <div className="my-4">
          <ul className="space-y-3">
            {careTips.map((careTip) => {
              return <CareTipItem key={careTip.tip} careTip={careTip} />;
            })}
          </ul>
        </div>
      )}
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
