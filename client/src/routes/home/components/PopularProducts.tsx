import Product from "../../../components/Product";

type TopEightProps = {
  topEight: {
    id: string;
    name: string;
    price: number;
    images: string[];
  }[];
};

const PopularProducts = ({ topEight }: TopEightProps) => {
  return (
    <section id="popularne" className="mx-auto mt-28 px-5">
      <h1 className="text-[1.5rem] font-semibold tracking-wider mb-4">
        Popularne produkty
      </h1>
      <div className="md:w-full grid md:grid-cols-2 lg:grid-cols-[1fr,1fr,1fr,1fr] gap-7 justify-items-center mx-auto">
        {topEight?.map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
    </section>
  );
};

export default PopularProducts;
