import CategoriesButtons from "./components/CategoriesButtons";
import SortCategories from "./components/SortCategories";
import AllProductsList from "./components/AllProductsList";
import { useLoaderData } from "react-router";
import { Helmet } from "react-helmet-async";

const Categories = () => {
  const products = useLoaderData();

  return (
    <div className="max-w-7xl mx-auto pt-40 px-5">
      <Helmet>
        <title>Kategorie</title>
        <meta
          name="description"
          content="Odkryj nasze kategorie mebli. Znajdziesz tu meble na wymiar, nowoczesne kolekcje oraz klasyczne wzornictwo. Profesjonalne doradztwo, konkurencyjne ceny i najwyższa jakość wykonania. Sprawdź naszą ofertę mebli do domu i biura."
        />
      </Helmet>
      <CategoriesButtons />
      <SortCategories />
      <AllProductsList products={products} />
    </div>
  );
};
export default Categories;
