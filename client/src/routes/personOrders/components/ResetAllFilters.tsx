import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router";

const ResetAllFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // count of query params
  const paramsCount = Array.from(searchParams.keys()).length;

  // clear query params
  const clearParams = () => {
    setSearchParams({});
  };

  if (paramsCount === 0) return null;

  return (
    <Button
      variant={"secondary"}
      className="bg-amber-600 text-white hover:bg-amber-400"
      onClick={clearParams}
    >
      Resetuj filtry
    </Button>
  );
};
export default ResetAllFilters;
