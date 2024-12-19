import { Tech } from "@/utils/types";

const TechData = ({ techData }: { techData: Tech[] }) => {
  return (
    <div className="flex-1">
      <h3 className="text-[1.4rem] font-semibold mb-2">Dane techniczne</h3>
      <table cellPadding={4}>
        <tbody>
          {techData?.map((tech, index) => {
            return (
              <tr key={index}>
                <th className="align-top text-left pr-4">
                  <b className="font-medium">{tech.name}:</b>
                </th>
                <td>
                  <span>{tech.data}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default TechData;
