import { Dimension } from "@/utils/types";

const Dimensions = ({ dimensions }: { dimensions: Dimension[] }) => {
  return (
    <div className="flex-1">
      <h3 className="text-[1.4rem] font-semibold mb-2">Wymiary</h3>
      <ul>
        {dimensions?.map((dim, index) => {
          return (
            <li key={index}>
              <b className="inline-block font-medium w-[200px]">{dim.name}:</b>
              <span>{dim.dim}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Dimensions;
