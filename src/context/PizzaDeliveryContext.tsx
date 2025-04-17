import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from "react";

const TOPPINGS_LIST = [
  "Pepperoni",
  "Mushrooms",
  "Onions",
  "Sausage",
  "Bacon",
  "Olives",
  "Peppers",
  "Pineapple",
];
const CRUST_TYPES = ["Regular", "Thin", "Stuffed", "Cauliflower"];
const SIZES = ["Small", "Medium", "Large", "X-Large"];

const BASE_PRICE: Record<string, number> = {
  Small: 8,
  Medium: 10,
  Large: 12,
  XLarge: 14,
};
const PRICE_PER_TOPPING = 1.5;
const CRUST_PRICE: Record<string, number> = {
  Regular: 0,
  Thin: 0,
  Stuffed: 3,
  Cauliflower: 2,
};
const ADDRESS_COMPLEXITY_FACTOR = 0.05;

type Crust = (typeof CRUST_TYPES)[number];
type Size = (typeof SIZES)[number];
type Topping = (typeof TOPPINGS_LIST)[number];

interface PizzaDeliveryContextState {
  customerName: string;
  crust: Crust;
  size: Size;
  toppings: Topping[];
  deliveryAddress: string;
  totalPrice: number;
  setCustomerName: (name: string) => void;
  setCrust: (crust: Crust) => void;
  setSize: (size: Size) => void;
  toggleTopping: (topping: Topping) => void;
  setDeliveryAddress: (address: string) => void;
}

const PizzaDeliveryContext = createContext<
  PizzaDeliveryContextState | undefined
>(undefined);

interface PizzaDeliveryProviderProps {
  children: ReactNode;
}

export const PizzaDeliveryProvider: React.FC<PizzaDeliveryProviderProps> = ({
  children,
}) => {
  const [customerName, setCustomerNameState] = useState<string>("Pizza Lover");
  const [crust, setCrustState] = useState<Crust>(CRUST_TYPES[0]);
  const [size, setSizeState] = useState<Size>(SIZES[1]);
  const [toppings, setToppingsState] = useState<Topping[]>([TOPPINGS_LIST[0]]);
  const [deliveryAddress, setDeliveryAddressState] = useState<string>("");

  const setCustomerName = useCallback(
    (name: string) => setCustomerNameState(name),
    []
  );
  const setCrust = useCallback(
    (newCrust: Crust) => setCrustState(newCrust),
    []
  );
  const setSize = useCallback((newSize: Size) => setSizeState(newSize), []);
  const toggleTopping = useCallback((topping: Topping) => {
    setToppingsState((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping]
    );
  }, []);
  const setDeliveryAddress = useCallback(
    (address: string) => setDeliveryAddressState(address),
    []
  );

  const totalPrice = useMemo(() => {
    let price = BASE_PRICE[size] || 10;
    price += CRUST_PRICE[crust] || 0;
    price += toppings.length * PRICE_PER_TOPPING;
    price += deliveryAddress.length * ADDRESS_COMPLEXITY_FACTOR;
    return parseFloat(price.toFixed(2));
  }, [size, crust, toppings, deliveryAddress]);

  const contextValue: PizzaDeliveryContextState = {
    customerName,
    crust,
    size,
    toppings,
    deliveryAddress,
    totalPrice,
    setCustomerName,
    setCrust,
    setSize,
    toggleTopping,
    setDeliveryAddress,
  };

  return (
    <PizzaDeliveryContext.Provider value={contextValue}>
      {children}
    </PizzaDeliveryContext.Provider>
  );
};

export const usePizzaDeliveryContext = () => {
  const context = useContext(PizzaDeliveryContext);
  if (context === undefined) {
    throw new Error(
      "usePizzaDeliveryContext must be used within a PizzaDeliveryProvider"
    );
  }
  return context;
};

export { TOPPINGS_LIST, CRUST_TYPES, SIZES };
