import { MaterialDetail } from "@/utils/types";
import { useState } from "react";
import CollapsibleButton from "./CollapsibleButton";

const MaterialDetails = ({
  materialDetails,
}: {
  materialDetails: MaterialDetail[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <CollapsibleButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Szczegóły materiału"
      />
      {/* data table */}
      {isOpen && (
        <table className="mt-4">
          <tbody>
            {materialDetails?.map((material, index) => {
              return (
                <tr key={index}>
                  <th className="align-top text-left pr-2">
                    <b className="inline-block font-medium">
                      {material?.name}:
                    </b>
                  </th>
                  <td className="align-top">
                    <ul>
                      {material?.description?.map((desc, index) => {
                        return <li key={index}>{desc}</li>;
                      })}
                    </ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MaterialDetails;
