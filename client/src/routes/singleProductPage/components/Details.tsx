import { Detail } from "@/utils/types";

const Details = ({ details }: { details: Detail[] }) => {
  return (
    <div className="flex-1">
      <h3 className="text-[1.4rem] font-semibold mb-2">Szczegóły</h3>
      <ul>
        {details.map((detail, index) => {
          return (
            <li key={index}>
              <b className="inline-block font-medium w-[200px]">
                {detail.name}:
              </b>
              <span>{detail.description}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Details;
