import { createContext, useState } from "react";

// dropdown context
type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: () => {},
});

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);

  // useEffect(() => {
  //     console.log("To jest log z authContext", token)
  // }, [token])

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
