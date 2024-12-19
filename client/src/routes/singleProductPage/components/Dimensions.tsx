import { Dimension } from "@/utils/types";

const Dimensions = ({ dimensions }: { dimensions: Dimension[] }) => {
  return (
    <div className="flex-1">
      <h3 className="text-[1.4rem] font-semibold mb-2">Wymiary</h3>
      <table cellPadding={4}>
        <tbody>
          {dimensions?.map((dim, index) => {
            return (
              <tr key={index}>
                <th className="align-top text-left pr-4">
                  <b className="inline-block font-medium">{dim.name}:</b>
                </th>
                <td>
                  <span>{dim.dim}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Dimensions;
