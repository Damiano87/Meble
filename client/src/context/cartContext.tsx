import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface CartContextType {
  openCart: boolean;
  setOpenCart: Dispatch<SetStateAction<boolean>>;
}

const defaultContextValue: CartContextType = {
  openCart: false,
  setOpenCart: () => {},
};

export const CartContext = createContext<CartContextType>(defaultContextValue);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [openCart, setOpenCart] = useState<boolean>(false);

  return (
    <CartContext.Provider value={{ openCart, setOpenCart }}>
      {children}
    </CartContext.Provider>
  );
}
