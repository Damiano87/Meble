import { Button } from "@/components/ui/button";
import PasswordChangeModal from "./components/PasswordChangeModal";
import { useState } from "react";

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
      {isOpen && <PasswordChangeModal handleClose={handleClose} />}
    </div>
  );
};
export default PasswordChange;
