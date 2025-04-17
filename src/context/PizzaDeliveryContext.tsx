import React, { createContext, useContext, useRef, useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { useUserContext } from './UserContext';

// Constants
export const TOPPINGS_LIST = ['Pepperoni', 'Mushrooms', 'Onions', 'Sausage', 'Bacon', 'Olives', 'Peppers', 'Pineapple'];
export const CRUST_TYPES = ['Regular', 'Thin', 'Stuffed', 'Cauliflower'];
export const SIZES = ['Small', 'Medium', 'Large', 'XLarge'];

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

// Store State Type
interface PizzaDeliveryState {
  crust: Crust;
  size: Size;
  toppings: Topping[];
}

// Subscription Listener Type
type Listener = () => void;

// Store Manager Type
interface PizzaDeliveryStore {
  getState: () => PizzaDeliveryState;
  setState: (updater: (state: PizzaDeliveryState) => PizzaDeliveryState) => void;
  subscribe: (listener: Listener) => () => void;
}

// Context Definition
const PizzaDeliveryContext = createContext<PizzaDeliveryStore | null>(null);

// Provider Component Props
interface PizzaDeliveryProviderProps {
  children: React.ReactNode;
}

export const PizzaDeliveryProvider: React.FC<PizzaDeliveryProviderProps> = ({ children }) => {
  // Get delivery address from UserContext for price calculation
  const { deliveryAddress } = useUserContext();
  
  // Create a ref to hold state and listeners
  const storeRef = useRef<{
    state: PizzaDeliveryState;
    listeners: Set<Listener>;
  }>({
    state: {
      crust: CRUST_TYPES[0],
      size: SIZES[1],
      toppings: [TOPPINGS_LIST[0]],
    },
    listeners: new Set()
  });

  // Function to get current state
  const getState = useCallback((): PizzaDeliveryState => {
    return storeRef.current.state;
  }, []);

  // Function to update state
  const setState = useCallback((updater: (state: PizzaDeliveryState) => PizzaDeliveryState) => {
    // Update state immutably
    storeRef.current.state = updater(storeRef.current.state);
    
    // Notify all listeners
    storeRef.current.listeners.forEach(listener => listener());
  }, []);

  // Function to subscribe to state changes
  const subscribe = useCallback((listener: Listener) => {
    const { listeners } = storeRef.current;
    listeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      listeners.delete(listener);
    };
  }, []);

  // Create the store object
  const store: PizzaDeliveryStore = {
    getState,
    setState,
    subscribe
  };

  // Removed useEffect for price calculation since it's now handled by useTotalPrice hook

  // Return the provider
  return (
    <PizzaDeliveryContext.Provider value={store}>
      {children}
    </PizzaDeliveryContext.Provider>
  );
};

// Custom hook to use the store
export const usePizzaDeliveryStore = (): PizzaDeliveryStore => {
  const store = useContext(PizzaDeliveryContext);
  if (!store) {
    throw new Error('usePizzaDeliveryStore must be used within a PizzaDeliveryProvider');
  }
  return store;
};

// Custom selector hook that subscribes to specific state changes
export function usePizzaDeliverySelector<Selected>(
  selector: (state: PizzaDeliveryState) => Selected
): Selected {
  const store = usePizzaDeliveryStore();
  
  // Use React 18's useSyncExternalStore for subscribing to external store
  return React.useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState())
  );
}

// Convenience hooks for common state selections
export const useCrust = () => usePizzaDeliverySelector(state => state.crust);
export const useSize = () => usePizzaDeliverySelector(state => state.size);
export const useToppings = () => usePizzaDeliverySelector(state => state.toppings);

// Action hooks
export const useSetCrust = () => {
  const store = usePizzaDeliveryStore();
  
  return useCallback((newCrust: Crust) => {
    store.setState(state => ({
      ...state,
      crust: newCrust
    }));
  }, [store]);
};

export const useSetSize = () => {
  const store = usePizzaDeliveryStore();
  
  return useCallback((newSize: Size) => {
    store.setState(state => ({
      ...state,
      size: newSize
    }));
  }, [store]);
};

export const useToggleTopping = () => {
  const store = usePizzaDeliveryStore();
  
  return useCallback((topping: Topping) => {
    store.setState(state => {
      const toppings = state.toppings.includes(topping)
        ? state.toppings.filter(t => t !== topping)
        : [...state.toppings, topping];
      
      return {
        ...state,
        toppings
      };
    });
  }, [store]);
}; 