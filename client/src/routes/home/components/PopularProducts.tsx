import Product from "../../../components/Product";
import { type Products } from "../../../utils/types";

const PopularProducts = ({ products }: Products) => {
  return (
    <section id="popularne" className="mx-auto mt-28 px-5">
      <h1 className="text-[1.5rem] font-semibold tracking-wider mb-4">
        Popularne produkty
      </h1>
      <div className="md:w-full grid md:grid-cols-2 lg:grid-cols-[1fr,1fr,1fr,1fr] gap-7 justify-items-center mx-auto">
        {products?.map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
    </section>
  );
};

export default PopularProducts;
