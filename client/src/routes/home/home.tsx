import { useLoaderData } from "react-router";
import Mosaic from "./components/Mosaic";
import PopularProducts from "./components/PopularProducts";
import ShopNow from "./components/ShopNow";
import Trendy from "./components/Trendy";

export default function Home() {
  const topEight = useLoaderData();

  return (
    <div className="max-w-7xl mx-auto">
      <Mosaic />
      <PopularProducts topEight={topEight} />
      <ShopNow />
      <Trendy />
    </div>
  );
}
