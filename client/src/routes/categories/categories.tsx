import CategoriesButtons from "./components/CategoriesButtons";
import SortCategories from "./components/SortCategories";
import AllProductsList from "./components/AllProductsList";
import { useLoaderData } from "react-router";
import MetaData from "@/components/Meta";

const Categories = () => {
  const products = useLoaderData();

  return (
    <div className="max-w-7xl mx-auto pt-40 px-5">
      <MetaData
        title="Kategorie"
        content="Odkryj nasze kategorie mebli. Znajdziesz tu meble na wymiar, nowoczesne kolekcje oraz klasyczne wzornictwo. Profesjonalne doradztwo, konkurencyjne ceny i najwyższa jakość wykonania. Sprawdź naszą ofertę mebli do domu i biura."
      />
      <CategoriesButtons />
      <SortCategories />
      <AllProductsList products={products} />
    </div>
  );
};
export default Categories;
