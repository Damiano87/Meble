import { useState } from "react";
import ReusableModal from "../ReusableModal";
import Logout from "./Logout";
import UserModalPanel from "./UserModalPanel";

const UserNameDisplay = ({ username }: { username: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  // open and close modal functions
  const openModal = (): void => setIsOpen(true);
  const closeModal = (): void => setIsOpen(false);

  return (
    <div className="relative group" onClick={openModal} title="User panel">
      <div className="cursor-pointer flex items-center justify-center">
        <span className="text-[1rem]">{username.toUpperCase()}</span>
      </div>
      {/* <Logout /> */}
      {isOpen && (
        <ReusableModal
          title="Witamy, "
          handleClose={closeModal}
          username={username}
        >
          <UserModalPanel />
        </ReusableModal>
      )}
    </div>
  );
};
export default UserNameDisplay;
