import CategoriesButtons from "./components/CategoriesButtons";
import SortCategories from "./components/SortCategories";
import AllProductsList from "./components/AllProductsList";
import { useSearchParams } from "react-router";
import MetaData from "@/components/Meta";
import { useProducts } from "@/hooks/products/useGetProducts";

const Categories = () => {
  const [searchParams] = useSearchParams();

  const queryParams = {
    search: searchParams.get("q") || undefined,
    sort: searchParams.get("sort") || undefined,
    category: searchParams.get("category") || undefined,
  };

  const { products } = useProducts(queryParams);

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
