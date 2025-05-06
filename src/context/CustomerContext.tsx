import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback } from "react";

interface CustomerContextState {
  customerName: string;
  setCustomerName: (name: string) => void;
}

const CustomerContext = createContext<CustomerContextState | undefined>(undefined);

interface CustomerProviderProps {
  children: ReactNode;
}

export const CustomerProvider: React.FC<CustomerProviderProps> = ({ children }) => {
  const [customerName, setCustomerNameState] = useState<string>("");

  const setCustomerName = useCallback((name: string) => {
    setCustomerNameState(name);
  }, []);

  const contextValue = useMemo(
    () => ({
      customerName,
      setCustomerName,
    }),
    [customerName, setCustomerName]
  );

  return (
    <CustomerContext.Provider value={contextValue}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error("useCustomerContext must be used within a CustomerProvider");
  }
  return context;
}; 