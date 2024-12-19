import { Detail } from "@/utils/types";

const Details = ({ details }: { details: Detail[] }) => {
  return (
    <div className="flex-1">
      <h3 className="text-[1.4rem] font-semibold mb-2">Szczegóły</h3>
      <table cellPadding={4}>
        <tbody>
          {details.map((detail, index) => {
            return (
              <tr key={index}>
                <th className="align-top text-left pr-4">
                  <b className=" font-medium">{detail.name}:</b>
                </th>
                <td className="align-top">
                  <span>{detail.description}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Details;
