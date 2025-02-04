import Rater from "./Rater";
import GetSpecificRaters from "./GetSpecificRaters";
import SortRaters from "./SortRaters";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useRaters } from "@/hooks/useRaters";

const Raters = ({
  id,
  ratings,
}: {
  id: string;
  ratings: Record<5 | 2 | 1 | 4 | 3, number | undefined>;
}) => {
  // get raters
  const { raters, isPending, error } = useRaters(id);

  // pending state
  if (isPending) return <LoadingIndicator />;

  // if rror
  if (error) return <div>Error: {error.message}</div>;

  // if no raters
  if (!raters)
    return (
      <div className="my-7 text-[1.4rem] font-medium">
        Ten produkt nie ma jeszcze ocen.
      </div>
    );

  return (
    <div className="borde border-red-600">
      <div className="md:flex items-start justify-between space-y-4 md:space-y-0">
        <GetSpecificRaters ratings={ratings} />
        <SortRaters />
      </div>
      <div className="space-y-3 my-7 max-w-[40rem]">
        {raters.map((rater) => (
          <Rater key={rater.id} {...rater} />
        ))}
      </div>
    </div>
  );
};

export default Raters;
