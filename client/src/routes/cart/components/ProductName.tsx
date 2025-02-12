import { capitalizeFirstLetter, sliceName } from "@/utils/functions";
import { Link } from "react-router";

type ProductNameProps = {
  productId: string;
  name: string;
  isAsideCart?: boolean;
};

const ProductName = ({ productId, name, isAsideCart }: ProductNameProps) => {
  return (
    <Link to={`/categories/${productId}`}>
      <h4
        className={`${
          isAsideCart && "text-slate-500"
        } min-w-[100px] hover:underline`}
        title={capitalizeFirstLetter(name)}
      >
        {sliceName(name, isAsideCart)}
      </h4>
    </Link>
  );
};
export default ProductName;
