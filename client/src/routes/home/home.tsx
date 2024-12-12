import React, { Suspense } from "react";
import { useLoaderData } from "react-router";
import Mosaic from "./components/Mosaic";
import ShopNow from "./components/ShopNow";
// import Trendy from "./components/Trendy";

const PopularProducts = React.lazy(
  () => import("./components/PopularProducts")
);

const Trendy = React.lazy(() => import("./components/Trendy"));

export default function Home() {
  const { topEight, trendyProducts } = useLoaderData();

  return (
    <div className="max-w-7xl mx-auto">
      <Mosaic />
      <Suspense
        fallback={
          <div className="text-[1.5rem] font-semibold">Ładowanie...</div>
        }
      >
        <PopularProducts topEight={topEight} />
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
