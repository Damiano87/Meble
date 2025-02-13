import { Product } from "@/utils/types";
import Details from "../AccordionInfo/Details";
import Features from "../AccordionInfo/Features";
import Dimensions from "../AccordionInfo/Dimensions";
import InOffer from "../AccordionInfo/InOffer";
import TechData from "../AccordionInfo/TechData";
import CareTips from "../AccordionInfo/CareTips";

const SecondInfo = ({ product }: { product: Product }) => {
  const {
    title,
    description,
    details,
    features,
    dimensions,
    offers,
    techData,
    careTips,
  } = product;

  return (
    <section className="mt-14">
      <div className="border-y-2 py-6 space-y-10">
        <h2 className="text-[1.5rem] font-semibold">{title}</h2>
        <p className="text-[.9rem]">{description}</p>
      </div>
      <div className="md:flex space-y-8 md:space-y-0 gap-14 mt-5">
        <Details details={details} />
        <Features features={features} />
      </div>
      <div className="md:flex space-y-8 md:space-y-0 gap-14 mt-5 pt-4 border-t-2">
        <Dimensions dimensions={dimensions} />
        <InOffer offers={offers} />
      </div>
      {techData.length > 0 && (
        <div className="md:flex space-y-8 md:space-y-0 gap-14 mt-5 pt-4 border-t-2">
          <TechData techData={techData} />
          <CareTips careTips={careTips} />
        </div>
      )}
    </section>
  );
};
export default SecondInfo;
