import { Product } from "@/utils/types";
import MaterialDetails from "./MaterialDetails";

const ThirdInfo = ({ product }: { product: Product }) => {
  const { materialDetails } = product;

  return (
    <section className="mt-14">
      <MaterialDetails materialDetails={materialDetails} />
    </section>
  );
};

export default ThirdInfo;
