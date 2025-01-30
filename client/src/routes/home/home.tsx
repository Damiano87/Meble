import React, { Suspense } from "react";
import { useLoaderData } from "react-router";
import Mosaic from "./components/Mosaic";
import ShopNow from "./components/ShopNow";
import { Helmet } from "react-helmet-async";

const PopularProducts = React.lazy(
  () => import("./components/PopularProducts")
);

const Trendy = React.lazy(() => import("./components/Trendy"));

export default function Home() {
  const { products, trendyProducts } = useLoaderData();

  return (
    <div className="max-w-7xl mx-auto">
      <Helmet>
        <title>H Meble</title>
        <meta
          name="description"
          content="Odkryj wyjątkowe meble na wymiar, nowoczesne kolekcje oraz klasyczne wzornictwo. Profesjonalne doradztwo, konkurencyjne ceny i najwyższa jakość wykonania. Sprawdź naszą ofertę mebli do domu i biura."
        />
      </Helmet>
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
}
