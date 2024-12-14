// import data from "../../../data";
import Product from "../../../components/Product";
import { type Products } from "../../../utils/types";

const ProductList = ({ products }: Products) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-[1.5rem] font-semibold my-14">
        Brak produktów do wyświetlenia...
      </div>
    );
  }

  return (
    <div className="my-36">
      <p className="font-bold">{products?.length} products</p>
      <div className=" md:w-full grid md:grid-cols-2 lg:grid-cols-[1fr,1fr,1fr,1fr] gap-7 justify-items-center border-t-[1px] border-black pt-14 mt-2 mx-auto">
        {products?.map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
    </div>
  );
};

export default ProductList;
