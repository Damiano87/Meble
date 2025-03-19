import { useClickAway } from "react-use";
import { TfiClose } from "react-icons/tfi";
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";
import { capitalizeFirstLetter } from "@/utils/functions";

type ReusableModalProps = {
  handleClose: () => void;
  title: string;
  username?: string;
  children: React.ReactNode;
};

const ReusableModal = ({
  handleClose,
  title,
  username,
  children,
}: ReusableModalProps) => {
  const ref = useRef(null);
  useClickAway(ref, handleClose);

  // handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleClose]);

  // stop propagation of clicks inside modal
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={ref}
        className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl"
        onClick={handleContentClick}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-2xl font-semibold">
            {title} {username && capitalizeFirstLetter(username)}!
          </h2>
          <Button
            variant="secondary"
            className="[&_svg]:size-6"
            aria-label="Zamknij"
            onClick={handleClose}
          >
            <TfiClose />
          </Button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body
  );
};
export default ReusableModal;
