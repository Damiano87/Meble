import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Definicja interfejsu kontekstu
interface OverlayContextType {
  isOverlayVisible: boolean;
  setIsOverlayVisible: Dispatch<SetStateAction<boolean>>;
}

// Domyślna wartość kontekstu
const defaultContextValue: OverlayContextType = {
  isOverlayVisible: false,
  setIsOverlayVisible: () => {},
};

// Stworzenie kontekstu
export const OverlayContext =
  createContext<OverlayContextType>(defaultContextValue);

// Provider komponent
interface OverlayProviderProps {
  children: ReactNode;
}

export function OverlayProvider({ children }: OverlayProviderProps) {
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);

  return (
    <OverlayContext.Provider value={{ isOverlayVisible, setIsOverlayVisible }}>
      {children}
    </OverlayContext.Provider>
  );
}
