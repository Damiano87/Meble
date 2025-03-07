import { useAuth } from "@/hooks/auth/useAuth";
import PasswordChange from "./components/PasswordChange/PasswordChange";
import UserForm from "./components/form/UserForm";

const Cabinet = () => {
  const { email } = useAuth();

  return (
    <div className="pt-40 max-w-5xl mx-auto px-4 grid grid-cols-2">
      <div>
        <h1 className="text-2xl font-semibold mb-6">Moje dane</h1>
        <p>
          <span className="font-semibold">E-mail jako nazwa użytkownika: </span>
          <span>{email}</span>
        </p>
        <PasswordChange />
        <UserForm />
      </div>
    </div>
  );
};
export default Cabinet;
