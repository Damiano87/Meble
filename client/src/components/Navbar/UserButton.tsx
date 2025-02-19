import { TbUser } from "react-icons/tb";
import RegisterAndLoginBtn from "./RegisterAndLoginBtn";
import { useAuth } from "@/hooks/auth/useAuth";
import UserNameDisplay from "./UserNameDisplay";

const UserButton = () => {
  const { username } = useAuth();

  if (username) return <UserNameDisplay username={username} />;

  return (
    <div className="relative group">
      <TbUser size={25} />
      <RegisterAndLoginBtn />
    </div>
  );
};

export default UserButton;
