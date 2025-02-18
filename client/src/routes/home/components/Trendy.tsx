import Product from "@/components/Product";

type TrendyProduct = {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  className?: string;
};

const Trendy = ({ trendyProducts }: { trendyProducts: TrendyProduct[] }) => {
  return (
    <section className="mt-28 px-5 mx-auto">
      <h1 className="text-[1.5rem] font-semibold tracking-wider mb-4">
        Trendy
      </h1>
      <div className="carousel carousel-center space-x-3 w-full bg-white p-4">
        {trendyProducts?.map((product) => {
          return (
            <Product
              key={product.id}
              {...product}
              className="carousel-item w-[14rem]"
            />
          );
        })}
      </div>
    </section>
  );
};

export default Trendy;
