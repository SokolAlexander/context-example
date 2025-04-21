import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

export const TOPPINGS_LIST = [
  "Pepperoni",
  "Mushrooms",
  "Onions",
  "Sausage",
  "Bacon",
  "Olives",
  "Peppers",
  "Pineapple",
];
export const CRUST_TYPES = ["Regular", "Thin", "Stuffed", "Cauliflower"];
export const SIZES = ["Small", "Medium", "Large", "XLarge"];

type Crust = (typeof CRUST_TYPES)[number];
type Size = (typeof SIZES)[number];
type Topping = (typeof TOPPINGS_LIST)[number];

// State interface
interface PizzaDeliveryState {
  crust: Crust;
  size: Size;
  toppings: Topping[];
}

// Object to track components that are listening to state changes
type StateSubscription = {
  id: number;
  selector: (state: PizzaDeliveryState) => any;
  callback: () => void;
};

// Global variables - this demonstrates one of the challenges of custom state management
// We're storing state and subscriptions outside of React's flow
let currentState: PizzaDeliveryState = {
  crust: CRUST_TYPES[0],
  size: SIZES[1],
  toppings: [TOPPINGS_LIST[0]],
};

let subscriptions: StateSubscription[] = [];
let nextSubscriptionId = 1;

// Simple API for state management
const pizzaStore = {
  getState: () => currentState,
  
  setState: (newState: Partial<PizzaDeliveryState>) => {
    // Update state
    currentState = { ...currentState, ...newState };
    
    // Notify subscribers - this is simplified and doesn't check if relevant values changed
    subscriptions.forEach(sub => {
      // Try to only update subscribers who care about the changed values
      // This is naive and error-prone, showing the challenge
      const oldValue = sub.selector(currentState);
      sub.callback();
    });
  },
  
  // Subscribe to state changes
  subscribe: (callback: () => void, selector: (state: PizzaDeliveryState) => any) => {
    const id = nextSubscriptionId++;
    subscriptions.push({ id, selector, callback });
    
    // Return function to unsubscribe
    return () => {
      subscriptions = subscriptions.filter(sub => sub.id !== id);
    };
  }
};

// Create a React context that will provide access to the store
const PizzaDeliveryContext = createContext<typeof pizzaStore | null>(null);

// Provider component
interface PizzaDeliveryProviderProps {
  children: React.ReactNode;
}

export const PizzaDeliveryProvider: React.FC<PizzaDeliveryProviderProps> = ({
  children,
}) => {
  // This provider doesn't have state itself - it just provides access to the store
  return (
    <PizzaDeliveryContext.Provider value={pizzaStore}>
      {children}
    </PizzaDeliveryContext.Provider>
  );
};

// Hook to access the store
export const usePizzaDeliveryStore = () => {
  const store = useContext(PizzaDeliveryContext);
  if (!store) {
    throw new Error(
      "usePizzaDeliveryStore must be used within a PizzaDeliveryProvider"
    );
  }
  return store;
};

// Custom hook that tries to implement selective rendering
export function usePizzaDeliverySelector<Selected>(
  selector: (state: PizzaDeliveryState) => Selected
): Selected {
  const store = usePizzaDeliveryStore();
  const [value, setValue] = useState<Selected>(() => selector(store.getState()));
  
  // The effect dependency list is a problem - we depend on the selector
  // function reference which might change on every render
  useEffect(() => {
    // This forceUpdate approach is naive and potentially inefficient
    const handleChange = () => {
      const newValue = selector(store.getState());
      // This equality check is simple and might not work for complex objects
      if (newValue !== value) {
        setValue(newValue);
      }
    };
    
    // Subscribe to store changes
    const unsubscribe = store.subscribe(handleChange, selector);
    return unsubscribe;
  }, [store, selector, value]); // Dependency on value can cause issues
  
  return value;
}

// Specialized hooks for common selections
export const useCrust = () => {
  return usePizzaDeliverySelector(state => state.crust);
};

export const useSize = () => {
  return usePizzaDeliverySelector(state => state.size);
};

export const useToppings = () => {
  return usePizzaDeliverySelector(state => state.toppings);
};

// Action creator hooks
export const useSetCrust = () => {
  const store = usePizzaDeliveryStore();
  return useCallback((newCrust: Crust) => {
    store.setState({ crust: newCrust });
  }, [store]);
};

export const useSetSize = () => {
  const store = usePizzaDeliveryStore();
  return useCallback((newSize: Size) => {
    store.setState({ size: newSize });
  }, [store]);
};

export const useToggleTopping = () => {
  const store = usePizzaDeliveryStore();
  return useCallback((topping: Topping) => {
    const currentToppings = store.getState().toppings;
    const newToppings = currentToppings.includes(topping)
      ? currentToppings.filter(t => t !== topping)
      : [...currentToppings, topping];
    
    store.setState({ toppings: newToppings });
  }, [store]);
};
