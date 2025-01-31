import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { RiArrowDownSLine } from "react-icons/ri";

const GetSpecificRaters = ({
  ratings,
}: {
  ratings: Record<5 | 2 | 1 | 4 | 3, number | undefined>;
}) => {
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false); // state for dropdown button
  const [searchParams, setSearchParams] = useSearchParams();

  // get proper naming
  const getProperNaming = (star: number) => {
    switch (star) {
      case 1:
        return "gwiazdka";
      case 2:
        return "gwiazdki";
      case 3:
        return "gwiazdki";
      case 4:
        return "gwiazdki";
      case 5:
        return "gwiazdek";
    }
  };

  useEffect(() => {
    // read query parameter
    const stars = searchParams.get("number_of_stars");
    if (stars) {
      // split and set state
      setSelectedStars(stars.split(" ").map((s) => parseInt(s, 10)));
    }
  }, [searchParams]);

  // handle checkbox change
  const handleCheckboxChange = (star: number, checked: boolean) => {
    // if checked, add to selectedStars, else remove from selectedStars
    const selected = checked
      ? [...selectedStars, star]
      : selectedStars.filter((s) => s !== star);
    setSelectedStars(selected);

    // update search params
    const params = new URLSearchParams(searchParams);

    if (selected.length > 0) {
      params.set("number_of_stars", selected.sort((a, b) => a - b).join(" "));
    } else {
      params.delete("number_of_stars");
    }

    setSearchParams(params);
  };

  return (
    <div>
      <Button
        variant="outline"
        className="relative rounded-sm border-black"
        onClick={() => setIsOpen(!isOpen)} // toggle menu
      >
        <span className="text-[1.1rem]">Ocena</span>
        <RiArrowDownSLine
          className={`text-[1.1rem] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={20}
        />
      </Button>
      <div
        className="
          absolute 
          bg-white 
          border 
          border-black 
          max-w-[250px] 
          p-4 
          rounded-sm 
          overflow-hidden 
          transition-[height] 
          duration-300 
          ease-in-out
        "
        style={{
          height: isOpen ? "auto" : "0",
          visibility: isOpen ? "visible" : "hidden",
        }} // set height based on isOpen state
      >
        {[5, 4, 3, 2, 1].map((star) => {
          return (
            <div key={star} className="flex items-center gap-4 font-medium">
              <Checkbox
                id={`star-${star}`}
                value={star}
                checked={selectedStars.includes(star)}
                onCheckedChange={(checked: boolean) =>
                  handleCheckboxChange(star, checked)
                }
              />
              <label
                htmlFor={`star-${star}`}
                className="flex items-center w-full cursor-pointer"
              >
                <span className="w-[100px]">
                  {star} {getProperNaming(star)}
                </span>
                <span className="text-gray-600 text-right">
                  ({ratings[star as 1 | 2 | 3 | 4 | 5]})
                </span>
              </label>
            </div>
          );
        })}
        {selectedStars.length > 0 && (
          <button
            className="bg-red-900 border border-red-900 hover:bg-white hover:text-red-900 duration-700 text-white p-2 rounded-sm w-full mt-3"
            onClick={() => {
              setSearchParams(new URLSearchParams());
              setSelectedStars([]);
              setIsOpen(false);
            }}
          >
            Usuń
          </button>
        )}
      </div>
    </div>
  );
};
export default GetSpecificRaters;
