import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router";

const FilterOrders = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (value: string) => {
    console.log(value);

    const params = new URLSearchParams(searchParams);

    const statusValues = ["completed", "pending", "cancelled"];

    if (statusValues.includes(value)) {
      params.set("status", value);
    } else {
      params.set("sort", value);
    }

    setSearchParams(params);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px] ml-auto border border-black">
        <SelectValue placeholder={"Sortuj"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="newest">Od najnowszych</SelectItem>
          <SelectItem value="oldest">Od najstarszych</SelectItem>
          <SelectItem value="completed">Zakończone</SelectItem>
          <SelectItem value="pending">W toku</SelectItem>
          <SelectItem value="cancelled">Anulowane</SelectItem>
          <SelectItem value="mostexp">Od największej sumy</SelectItem>
          <SelectItem value="chipest">Od najtańszych</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default FilterOrders;
