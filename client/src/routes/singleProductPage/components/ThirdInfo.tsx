import { Product } from "@/utils/types";
import MaterialDetails from "./MaterialDetails";
import Resistance from "./Resistance";
import AdditionalInformation from "./AdditionalInformation";
import CareTipsWithButton from "./CareTipsWithButton";
import Packing from "./Packing";

const ThirdInfo = ({ product }: { product: Product }) => {
  const {
    materialDetails,
    resistance,
    additionalInfo,
    careTips,
    packing,
    techData,
  } = product;

  return (
    <section className="mt-14 border-b-2">
      {materialDetails && <MaterialDetails materialDetails={materialDetails} />}
      {resistance && <Resistance resistance={resistance} />}
      {additionalInfo && (
        <AdditionalInformation additionalInfo={additionalInfo} />
      )}
      {careTips && techData.length === 0 && (
        <CareTipsWithButton careTips={careTips} />
      )}
      {packing && <Packing packing={packing} />}
    </section>
  );
};

export default ThirdInfo;
