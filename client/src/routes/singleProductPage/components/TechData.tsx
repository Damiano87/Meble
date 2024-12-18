import { Tech } from "@/utils/types";

const TechData = ({ techData }: { techData: Tech[] }) => {
  return (
    <div className="flex-1">
      <h3 className="text-[1.4rem] font-semibold mb-2">Dane techniczne</h3>
      <ul>
        {techData?.map((tech, index) => {
          return (
            <li key={index}>
              <b className="inline-block font-medium w-[200px]">{tech.name}:</b>
              <span>{tech.data}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default TechData;
