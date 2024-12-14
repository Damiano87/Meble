import { useSearchParams } from "react-router";
import { debounce } from "lodash";
import { useCallback, useMemo, useState } from "react";
import ClearFilters from "./ClearFilters";

const SortCategories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");

  // Tworzymy debounced funkcję tylko dla aktualizacji URL
  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
          params.set("q", value);
        } else {
          params.delete("q");
        }
        setSearchParams(params);
      }, 500), // 500ms opóźnienia
    [searchParams, setSearchParams]
  );

  // Wrapper z useCallback dla stabilności referencji
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      // Natychmiastowa aktualizacja wartości input
      setInputValue(value);

      // Opóźniona aktualizacja URL
      debouncedSetSearch(value);
    },
    [debouncedSetSearch]
  );

  // ............. sort ..............

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    setSearchParams(params);
  };

  return (
    <div className="flex items-start gap-20 mt-20">
      <div>
        <input
          type="text"
          name="search"
          value={inputValue}
          placeholder="Szukaj..."
          className="block input input-bordered border-2 border-black w-full max-w-xs rounded-none"
          onChange={handleSearchChange}
        />
        <select
          onChange={(e) => handleSortChange(e.target.value)}
          className="select select-bordered border-2 border-black w-full max-w-xs rounded-none mt-5"
        >
          <option disabled>Sortuj wg</option>
          <option value={"price-up"}>Od najtańszych do najdroższych</option>
          <option value={"price-down"}>Od najdroższych do najtańszych</option>
          <option value={"most-popular"}>Od najpopularniejszych</option>
          <option value={"alphabetic"}>Alfabetycznie (A-Z)</option>
        </select>
      </div>
      <ClearFilters setInputValue={setInputValue} />
    </div>
  );
};

export default SortCategories;
