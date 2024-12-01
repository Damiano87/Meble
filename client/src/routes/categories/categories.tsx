import CategoriesButtons from "./components/CategoriesButtons";
import SortCategories from "./components/SortCategories";
import AllProductsList from "./components/AllProductsList";
const Categories = () => {
  return (
    <div className="max-w-7xl mx-auto pt-40 px-5">
      <CategoriesButtons />
      <SortCategories />
      <AllProductsList />
    </div>
  );
};
export default Categories;
