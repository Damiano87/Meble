import React, { Suspense } from "react";
import Mosaic from "./components/Mosaic";
import ShopNow from "./components/ShopNow";
import MetaData from "@/components/Meta";
import { useGetCombined } from "@/hooks/products/useGetCombined";

const PopularProducts = React.lazy(
  () => import("./components/PopularProducts")
);

const Trendy = React.lazy(() => import("./components/Trendy"));

const Home = () => {
  const { products, trendyProducts } = useGetCombined();

  return (
    <div className="max-w-7xl mx-auto">
      <MetaData
        title="H Meble"
        content="Odkryj wyjątkowe meble na wymiar, nowoczesne kolekcje oraz klasyczne wzornictwo. Profesjonalne doradztwo, konkurencyjne ceny i najwyższa jakość wykonania. Sprawdź naszą ofertę mebli do domu i biura."
      />
      <Mosaic />
      <Suspense
        fallback={
          <div className="text-[1.5rem] font-semibold">Ładowanie...</div>
        }
      >
        <PopularProducts products={products} />
      </Suspense>
      <ShopNow />
      <Suspense
        fallback={
          <div className="text-[1.5rem] font-semibold">Ładowanie...</div>
        }
      >
        <Trendy trendyProducts={trendyProducts} />
      </Suspense>
    </div>
  );
};

export default Home;
