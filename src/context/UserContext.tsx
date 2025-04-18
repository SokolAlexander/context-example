import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from "react";

interface UserContextState {
  customerName: string;
  setCustomerName: (name: string) => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
}

const UserContext = createContext<UserContextState | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [customerName, setCustomerNameState] = useState<string>("Pizza Lover");
  const [deliveryAddress, setDeliveryAddressState] = useState<string>("");

  const setCustomerName = useCallback(
    (name: string) => setCustomerNameState(name),
    []
  );
  const setDeliveryAddress = useCallback(
    (address: string) => setDeliveryAddressState(address),
    []
  );

  const contextValue = useMemo(
    () => ({
      customerName,
      setCustomerName,
      deliveryAddress,
      setDeliveryAddress,
    }),
    [customerName, setCustomerName, deliveryAddress, setDeliveryAddress]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
