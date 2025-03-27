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
    const params = new URLSearchParams(searchParams);

    const statusValues = ["completed", "pending", "cancelled"];
    const priceValues = ["highest", "lowest"];

    if (statusValues.includes(value)) {
      params.set("status", value);
    } else if (priceValues.includes(value)) {
      params.set("price", value);
    } else {
      params.set("sort", value);
    }

    setSearchParams(params);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px] ml-auto border border-black">
        <SelectValue placeholder="Sortuj" />
      </SelectTrigger>
      <SelectContent className="border border-black">
        <SelectGroup>
          <SelectItem value="newest">Od najnowszych</SelectItem>
          <SelectItem value="oldest">Od najstarszych</SelectItem>
          <SelectItem value="completed">Zakończone</SelectItem>
          <SelectItem value="pending">W toku</SelectItem>
          <SelectItem value="cancelled">Anulowane</SelectItem>
          <SelectItem value="highest">Od największej sumy</SelectItem>
          <SelectItem value="lowest">Od najmniejszej sumy</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default FilterOrders;
