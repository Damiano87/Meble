import { Button } from "@/components/ui/button";
import EmailModal from "./EmailModal";
import { useState } from "react";

const SendToEmailBtn = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant={"secondary"}
        className="border border-red-900 text-red-900 hover:bg-red-900 hover:text-white duration-500 rounded-sm"
        onClick={handleOpen}
      >
        Wyślij na email
      </Button>
      {open && <EmailModal handleClose={handleClose} />}
    </>
  );
};
export default SendToEmailBtn;
