import { Resistance } from "@/utils/types";
import { useState } from "react";
import CollapsibleButton from "./CollapsibleButton";

const ResistanceData = ({
  resistance,
}: {
  resistance: Resistance | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <CollapsibleButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Odporność"
      />
      {isOpen && (
        <div className="my-4">
          <ul className="list-disc list-outside ml-7">
            {resistance?.resistFrom.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="mt-1">{resistance?.resistDesc}</p>
        </div>
      )}
    </div>
  );
};

export default ResistanceData;
