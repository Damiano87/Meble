import CategoriesButtons from "./components/CategoriesButtons";
import SortCategories from "./components/SortCategories";
import AllProductsList from "./components/AllProductsList";
import { useLoaderData } from "react-router";

const Categories = () => {
  const products = useLoaderData();

  console.log(products);
  return (
    <div className="max-w-7xl mx-auto pt-40 px-5">
      <CategoriesButtons />
      <SortCategories />
      <AllProductsList products={products} />
    </div>
  );
};
export default Categories;
