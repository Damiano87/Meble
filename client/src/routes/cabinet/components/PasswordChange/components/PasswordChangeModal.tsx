import { useClickAway } from "react-use";
import { TfiClose } from "react-icons/tfi";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import PasswordChangeForm from "./PasswordChangeForm";

const PasswordChangeModal = ({ handleClose }: { handleClose: () => void }) => {
  const ref = useRef(null);
  useClickAway(ref, handleClose);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
      <div ref={ref} className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Nowe hasło</h2>
          <Button
            variant={"secondary"}
            className="[&_svg]:size-6"
            title="Zamknij"
            onClick={handleClose}
          >
            <TfiClose />
          </Button>
        </div>
        <PasswordChangeForm />
      </div>
    </div>
  );
};
export default PasswordChangeModal;
