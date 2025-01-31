import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect, useRef } from "react";
import { FaSort } from "react-icons/fa";
import { useSearchParams } from "react-router";

const SortRaters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // handle value change
  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("sort", value);
      setSearchParams(params);
    }
  };

  // naming
  const handleNaming = () => {
    switch (searchParams.get("sort")) {
      case "newest":
        return "Najnowsze";
      case "oldest":
        return "Najstarsze";
      case "highest":
        return "Najwyżej oceniane";
      case "lowest":
        return "Najniżej oceniane";
      default:
        return "Najnowsze";
    }
  };

  useEffect(() => {
    // close dropdown
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div className="relative">
      <Button
        variant={"outline"}
        className="border-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaSort />
        Sortuj: {handleNaming()}
      </Button>
      <div
        className="absolute right-0 w-[18rem] border border-black p-4 rounded-sm bg-white overflow-hidden 
          transition-[height] 
          duration-300 
          ease-in-out"
        style={{
          height: isOpen ? "auto" : "0",
          visibility: isOpen ? "visible" : "hidden",
        }} // set height based on isOpen state
        ref={dropdownRef}
      >
        <RadioGroup defaultValue={"newest"} onValueChange={handleValueChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="newest"
              id="newest"
              className="w-[14px] h-[14px]"
            />
            <Label htmlFor="newest">Najnowsze</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="oldest"
              id="oldest"
              className="w-[14px] h-[14px]"
            />
            <Label htmlFor="oldest">Najstarsze</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="lowest"
              id="lowest"
              className="w-[14px] h-[14px]"
            />
            <Label htmlFor="lowest">Najniżej oceniane</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="highest"
              id="highest"
              className="w-[14px] h-[14px]"
            />
            <Label htmlFor="highest">Najwyżej oceniane</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default SortRaters;
