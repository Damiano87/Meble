import { Button } from "@/components/ui/button";
import { useState } from "react";
import ReusableModal from "@/components/ReusableModal";
import SendEmailForm from "./SendEmailForm";

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
      {open && (
        <ReusableModal handleClose={handleClose} title="Wyślij mailem">
          <SendEmailForm />
        </ReusableModal>
      )}
    </>
  );
};
export default SendToEmailBtn;
