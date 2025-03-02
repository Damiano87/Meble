import { Button } from "@/components/ui/button";
import { useState } from "react";
import ReusableModal from "@/components/ReusableModal";
import PasswordChangeForm from "./components/PasswordChangeForm";

const PasswordChange = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="flex items-center gap-4 my-5">
      <p>Czy chcesz zmienić swoje hasło?</p>
      <Button variant={"link"} className="text-red-900" onClick={handleOpen}>
        Nowe hasło
      </Button>
      {isOpen && (
        <ReusableModal handleClose={handleClose} title="Nowe hasło">
          <PasswordChangeForm />
        </ReusableModal>
      )}
    </div>
  );
};
export default PasswordChange;
