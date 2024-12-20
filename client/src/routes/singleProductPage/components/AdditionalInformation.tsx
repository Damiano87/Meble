import { useState } from "react";
import CollapsibleButton from "./CollapsibleButton";

const AdditionalInformation = ({
  additionalInfo,
}: {
  additionalInfo: string | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <CollapsibleButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Informacje dodatkowe"
      />
      {isOpen && <p className="my-4 pr-6">{additionalInfo}</p>}
    </div>
  );
};
export default AdditionalInformation;
