import { useState } from "react";
import CollapsibleButton from "./CollapsibleButton";

const Packing = ({ packing }: { packing: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <CollapsibleButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Pakowanie i montaż"
      />
      {isOpen && (
        <ul className="my-4">
          {packing?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Packing;
