import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback } from 'react';

// --- Constants ---
const TOPPINGS_LIST = ['Pepperoni', 'Mushrooms', 'Onions', 'Sausage', 'Bacon', 'Olives', 'Peppers', 'Pineapple'];
const CRUST_TYPES = ['Regular', 'Thin', 'Stuffed', 'Cauliflower'];
const SIZES = ['Small', 'Medium', 'Large', 'X-Large'];

// --- Base Prices ---
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
const ADDRESS_COMPLEXITY_FACTOR = 0.05; // Price increases slightly with longer address

// --- Types ---
type Theme = 'light' | 'dark';
type Crust = typeof CRUST_TYPES[number];
type Size = typeof SIZES[number];
type Topping = typeof TOPPINGS_LIST[number];

type UserInfo = {
  customerName: string;
  theme: Theme;
};

type PizzaConfig = {
  crust: Crust;
  size: Size;
  toppings: Topping[];
};

type OrderDetails = {
  deliveryAddress: string;
  orderTime: Date | null;
  // Calculated price is part of the context value but not direct state
};

// --- Context State Type ---
interface PizzaContextState extends UserInfo, PizzaConfig, OrderDetails {
  // Calculated value
  totalPrice: number;

  // Actions
  setCustomerName: (name: string) => void;
  setTheme: (theme: Theme) => void;
  setCrust: (crust: Crust) => void;
  setSize: (size: Size) => void;
  toggleTopping: (topping: Topping) => void;
  setDeliveryAddress: (address: string) => void;
  placeOrder: () => void;
}

// --- Context Definition ---
// Rename context conceptually, keep file name StudioContext for now
const PizzaBuilderContext = createContext<PizzaContextState | undefined>(undefined);

// --- Provider Component ---
interface PizzaProviderProps {
  children: ReactNode;
}

export const StudioProvider: React.FC<PizzaProviderProps> = ({ children }) => {
  // Renamed state variables
  const [customerName, setCustomerNameState] = useState<string>('Pizza Lover');
  const [theme, setThemeState] = useState<Theme>('light');
  const [crust, setCrustState] = useState<Crust>(CRUST_TYPES[0]);
  const [size, setSizeState] = useState<Size>(SIZES[1]); // Default Medium
  const [toppings, setToppingsState] = useState<Topping[]>([TOPPINGS_LIST[0]]); // Default Pepperoni
  const [deliveryAddress, setDeliveryAddressState] = useState<string>('');
  const [orderTime, setOrderTimeState] = useState<Date | null>(null);

  // --- Actions ---
  const setCustomerName = useCallback((name: string) => setCustomerNameState(name), []);
  const setTheme = useCallback((newTheme: Theme) => setThemeState(newTheme), []);
  const setCrust = useCallback((newCrust: Crust) => setCrustState(newCrust), []);
  const setSize = useCallback((newSize: Size) => setSizeState(newSize), []);
  const toggleTopping = useCallback((topping: Topping) => {
    setToppingsState(prev =>
      prev.includes(topping) ? prev.filter(t => t !== topping) : [...prev, topping]
    );
  }, []);
  const setDeliveryAddress = useCallback((address: string) => setDeliveryAddressState(address), []);
  const placeOrder = useCallback(() => setOrderTimeState(new Date()), []);

  // --- Calculated Price --- (Memoize calculation)
  const totalPrice = useMemo(() => {
    let price = BASE_PRICE[size] || 10; // Default to medium price if size invalid
    price += CRUST_PRICE[crust] || 0;
    price += toppings.length * PRICE_PER_TOPPING;
    // Add slight cost based on address length (to mix concerns)
    price += deliveryAddress.length * ADDRESS_COMPLEXITY_FACTOR;
    return parseFloat(price.toFixed(2));
  }, [size, crust, toppings, deliveryAddress]);

  // Combine state and actions into the context value
  const contextValue = useMemo(() => ({
    customerName,
    theme,
    crust,
    size,
    toppings,
    deliveryAddress,
    orderTime,
    totalPrice,
    setCustomerName,
    setTheme,
    setCrust,
    setSize,
    toggleTopping,
    setDeliveryAddress,
    placeOrder,
  }), [
    customerName, theme, crust, size, toppings, deliveryAddress, orderTime, totalPrice,
    setCustomerName, setTheme, setCrust, setSize, toggleTopping, setDeliveryAddress, placeOrder
  ]);

  return (
    <PizzaBuilderContext.Provider value={contextValue}>
      {children}
    </PizzaBuilderContext.Provider>
  );
};

// --- Hook for consuming context ---
// Rename hook conceptually
export const useStudioContext = () => {
  const context = useContext(PizzaBuilderContext);
  if (context === undefined) {
    throw new Error('useStudioContext must be used within a StudioProvider (PizzaBuilderContext)');
  }
  return context;
};

// --- Export constants for use in components ---
export { TOPPINGS_LIST, CRUST_TYPES, SIZES };

/*
 * EXERCISE INSTRUCTIONS:
 * ======================
 *
 * This `PizzaBuilderContext` is overloaded. It mixes customer info (name, theme),
 * pizza configuration (crust, size, toppings), and order details (address, time, calculated price).
 *
 * This causes components to re-render unnecessarily. For example, changing the 'theme'
 * might re-render the `PizzaOptions` component, even though it only cares about crust, size, and toppings.
 * Selecting a topping might re-render `CustomerDetails`, even though it doesn't use toppings.
 * Entering a delivery address affects the price, potentially re-rendering everything.
 *
 * YOUR TASK:
 * ----------
 *
 * 1. Identify the distinct domains: User Info, Pizza Configuration, Order/Price Details.
 * 2. Refactor into multiple contexts (e.g., `UserInfoContext`, `PizzaConfigContext`, `OrderDetailsContext`).
 *    * Consider where the `totalPrice` calculation should live. Does it need its own context, or belong with Order Details?
 * 3. Update the `StudioProvider` (rename?) to wrap children with all the new providers.
 * 4. Update components (`PizzaOptions`, `OrderSummary`, `CustomerDetails`, `PizzaPreview`) to use the specific context(s) they need.
 * 5. Verify using the Render Counters (R:) that components re-render only when their relevant data changes.
 *
 * BONUS:
 * ------
 * Can price calculation be further optimized? Does address *really* need to affect price directly in the context calculation, or could that logic live elsewhere?
 */ 