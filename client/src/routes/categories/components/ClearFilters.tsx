import { IoIosClose } from "react-icons/io";
import { useSearchParams } from "react-router";

type ClearFiltersProps = {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

const ClearFilters = ({ setInputValue }: ClearFiltersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = Array.from(searchParams.keys());

  return (
    <>
      {params?.length ? (
        <button
          type="button"
          className="flex items-center border-2 border-amber-500 rounded-md pr-2 pl-4 py-1 hover:bg-amber-100"
          onClick={() => {
            setSearchParams(new URLSearchParams());
            setInputValue("");
          }}
        >
          <span className="mb-[3px]">Wyczyść</span>
          <IoIosClose size={30} />
        </button>
      ) : null}
    </>
  );
};
export default ClearFilters;
