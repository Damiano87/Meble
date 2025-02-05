import { createContext, useState, useEffect } from "react";

// auth context
type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  persist: false,
  setPersist: () => {},
});

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [persist, setPersist] = useState<boolean>(() => {
    const storedPersist = localStorage.getItem("persist");
    return storedPersist ? JSON.parse(storedPersist) : false;
  });

  // Synchronizacja persist w localStorage
  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return (
    <AuthContext.Provider value={{ token, setToken, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
