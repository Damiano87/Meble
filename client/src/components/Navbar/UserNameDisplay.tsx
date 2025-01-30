import Logout from "./Logout";

const UserNameDisplay = ({ username }: { username: string }) => {
  return (
    <div className="relative group">
      <div className="cursor-pointer flex items-center justify-center">
        <span className="text-[1rem]">{username.toUpperCase()}</span>
      </div>
      <Logout />
    </div>
  );
};
export default UserNameDisplay;
