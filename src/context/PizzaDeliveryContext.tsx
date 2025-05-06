import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from "react";

export const CRUST_TYPES = [
  "Regular",
  "Thin",
  "Stuffed",
  "Cauliflower",
] as const;
export const SIZES = ["Small", "Medium", "Large", "X-Large"] as const;
export const TOPPINGS_LIST = [
  "Pepperoni",
  "Mushrooms",
  "Onions",
  "Olives",
] as const;

const BASE_PRICE: Record<string, number> = {
  Small: 8,
  Medium: 10,
  Large: 12,
  "X-Large": 14,
};

const PRICE_PER_TOPPING = 1.5;

export type Crust = (typeof CRUST_TYPES)[number];
export type Size = (typeof SIZES)[number];
type Topping = (typeof TOPPINGS_LIST)[number];
type Theme = "light" | "dark";

interface PizzaDeliveryContextState {
  crust: Crust;
  size: Size;
  toppings: Topping[];
  totalPrice: number;
  theme: Theme;
  customerName: string;
  setCrust: (crust: Crust) => void;
  setSize: (size: Size) => void;
  toggleTopping: (topping: Topping) => void;
  toggleTheme: () => void;
  setCustomerName: (name: string) => void;
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
  const [crust, setCrustState] = useState<Crust>(CRUST_TYPES[0]);
  const [size, setSizeState] = useState<Size>(SIZES[1]);
  const [toppings, setToppingsState] = useState<Topping[]>([TOPPINGS_LIST[0]]);
  const [theme, setTheme] = useState<Theme>("light");
  const [customerName, setCustomerNameState] = useState<string>("");

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

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const setCustomerName = useCallback((name: string) => {
    setCustomerNameState(name);
  }, []);

  const totalPrice = useMemo(() => {
    let price = BASE_PRICE[size] || 10;
    price += toppings.length * PRICE_PER_TOPPING;
    return price;
  }, [size, toppings]);

  const contextValue = useMemo(
    () => ({
      crust,
      size,
      toppings,
      totalPrice,
      theme,
      customerName,
      setCrust,
      setSize,
      toggleTopping,
      toggleTheme,
      setCustomerName,
    }),
    [
      crust,
      size,
      toppings,
      totalPrice,
      theme,
      customerName,
      setCrust,
      setSize,
      toggleTopping,
      toggleTheme,
      setCustomerName,
    ]
  );

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
