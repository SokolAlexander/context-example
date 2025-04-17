import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback } from 'react';

// Constants
export const TOPPINGS_LIST = ['Pepperoni', 'Mushrooms', 'Onions', 'Sausage', 'Bacon', 'Olives', 'Peppers', 'Pineapple'];
export const CRUST_TYPES = ['Regular', 'Thin', 'Stuffed', 'Cauliflower'];
export const SIZES = ['Small', 'Medium', 'Large', 'X-Large'];

// Constants moved to the usePizzaPrice hook
// We're not including price constants here anymore since they're in the hook

// --- Types ---
type Crust = typeof CRUST_TYPES[number];
type Size = typeof SIZES[number];
type Topping = typeof TOPPINGS_LIST[number];

// Interface - removed totalPrice
interface PizzaDeliveryContextState {
  crust: Crust;
  size: Size;
  toppings: Topping[];
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
  
  // Removed UserContext dependency
  
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

  // Removed totalPrice calculation

  // Context value memoized - totalPrice removed
  const contextValue = useMemo(() => ({
    crust,
    size,
    toppings,
    setCrust,
    setSize,
    toggleTopping,
  }), [
    crust, size, toppings,
    setCrust, setSize, toggleTopping
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