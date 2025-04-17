import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback } from 'react';
import { useUserContext } from './UserContext'; // Import User context hook

// Constants
export const TOPPINGS_LIST = ['Pepperoni', 'Mushrooms', 'Onions', 'Sausage', 'Bacon', 'Olives', 'Peppers', 'Pineapple'];
export const CRUST_TYPES = ['Regular', 'Thin', 'Stuffed', 'Cauliflower'];
export const SIZES = ['Small', 'Medium', 'Large', 'X-Large'];

// Pricing
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

// --- Types ---
type Crust = typeof CRUST_TYPES[number];
type Size = typeof SIZES[number];
type Topping = typeof TOPPINGS_LIST[number];

// Interface - deliveryAddress and setter removed
interface PizzaDeliveryContextState {
  crust: Crust;
  size: Size;
  toppings: Topping[];
  totalPrice: number;
  setCrust: (crust: Crust) => void;
  setSize: (size: Size) => void;
  toggleTopping: (topping: Topping) => void;
}

// Context Definition
const PizzaDeliveryContext = createContext<PizzaDeliveryContextState | undefined>(undefined);

// Provider Component
interface PizzaDeliveryProviderProps {
  children: ReactNode;
}

export const PizzaDeliveryProvider: React.FC<PizzaDeliveryProviderProps> = ({ children }) => {
  // Pizza Config State
  const [crust, setCrustState] = useState<Crust>(CRUST_TYPES[0]);
  const [size, setSizeState] = useState<Size>(SIZES[1]);
  const [toppings, setToppingsState] = useState<Topping[]>([TOPPINGS_LIST[0]]);
  // *** Consume UserContext to get deliveryAddress for price calc ***
  const { deliveryAddress } = useUserContext();

  // Actions
  const setCrust = useCallback((newCrust: Crust) => setCrustState(newCrust), []);
  const setSize = useCallback((newSize: Size) => setSizeState(newSize), []);
  const toggleTopping = useCallback((topping: Topping) => {
    setToppingsState((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping]
    );
  }, []);
  // setDeliveryAddress action removed

  // Calculate Price internally - depends on deliveryAddress from UserContext
  const totalPrice = useMemo(() => {
    let price = BASE_PRICE[size] || 10;
    price += CRUST_PRICE[crust] || 0;
    price += toppings.length * PRICE_PER_TOPPING;
    // Use deliveryAddress from UserContext
    price += deliveryAddress.length * ADDRESS_COMPLEXITY_FACTOR;
    return parseFloat(price.toFixed(2));
  }, [size, crust, toppings, deliveryAddress]); // deliveryAddress is now from consumed context

  // Context value memoized - deliveryAddress/setter removed
  const contextValue = useMemo(() => ({
    crust,
    size,
    toppings,
    totalPrice,
    setCrust,
    setSize,
    toggleTopping,
  }), [
    crust, size, toppings, totalPrice, // Removed deliveryAddress from direct state deps
    setCrust, setSize, toggleTopping // Removed setDeliveryAddress
   ]);

  return (
    <PizzaDeliveryContext.Provider value={contextValue}>
      {children}
    </PizzaDeliveryContext.Provider>
  );
};

// Hook
export const usePizzaDeliveryContext = () => {
  const context = useContext(PizzaDeliveryContext);
  if (context === undefined) {
    throw new Error('usePizzaDeliveryContext must be used within a PizzaDeliveryProvider');
  }
  return context;
}; 