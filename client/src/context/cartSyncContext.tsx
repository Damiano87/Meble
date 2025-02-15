import { createContext, useContext, useState, ReactNode } from "react";

type CartSyncContextType = {
  syncFlag: number;
  triggerSync: () => void;
};

const CartSyncContext = createContext<CartSyncContextType | undefined>(
  undefined
);

export const CartSyncProvider = ({ children }: { children: ReactNode }) => {
  const [syncFlag, setSyncFlag] = useState(0);

  const triggerSync = () => {
    setSyncFlag((prev) => prev + 1);
  };

  return (
    <CartSyncContext.Provider value={{ syncFlag, triggerSync }}>
      {children}
    </CartSyncContext.Provider>
  );
};

export const useCartSync = () => {
  const context = useContext(CartSyncContext);
  if (context === undefined) {
    throw new Error("useCartSync must be used within a CartSyncProvider");
  }
  return context;
};
