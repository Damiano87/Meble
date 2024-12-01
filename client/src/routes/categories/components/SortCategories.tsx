// import { sortProducts, setInput } from "@/lib/features/productsSlice";
// import { useSelector, useDispatch } from "react-redux";

const SortCategories = () => {
  //   const searchInputValue = useSelector(
  //     (state) => state.products.searchInputValue
  //   );

  //   const dispatch = useDispatch();

  //   console.log(searchInputValue);
  return (
    <div className="mt-20">
      <input
        type="text"
        name="search"
        // value={"damian"}
        placeholder="Szukaj..."
        className="block input input-bordered border-2 border-black w-full max-w-xs rounded-none"
        // onChange={(e) => dispatch(setInput(e.target.value))}
      />
      <select
        // onChange={(e) => dispatch(sortProducts(e.target.value))}
        className="select select-bordered border-2 border-black w-full max-w-xs rounded-none mt-5"
      >
        <option disabled>Sortuj wg</option>
        <option value={"price-up"}>Od najtańszych do najdroższych</option>
        <option value={"price-down"}>Od najdroższych do najtańszych</option>
        <option value={"most-popular"}>Od najpopularniejszych</option>
        <option value={"alfabetycznie"}>Alfabetycznie (A-Z)</option>
        <option value={"magazyn"}>W magazynie</option>
      </select>
    </div>
  );
};

export default SortCategories;
