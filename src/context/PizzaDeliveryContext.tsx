import React, { createContext, useContext, useRef, useCallback } from "react";

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

interface PizzaDeliveryState {
  crust: Crust;
  size: Size;
  toppings: Topping[];
}

type Listener = () => void;

interface PizzaDeliveryStore {
  getState: () => PizzaDeliveryState;
  setState: (
    updater: (state: PizzaDeliveryState) => PizzaDeliveryState
  ) => void;
  subscribe: (listener: Listener) => () => void;
}

const PizzaDeliveryContext = createContext<PizzaDeliveryStore | null>(null);

interface PizzaDeliveryProviderProps {
  children: React.ReactNode;
}

export const PizzaDeliveryProvider: React.FC<PizzaDeliveryProviderProps> = ({
  children,
}) => {
  const storeRef = useRef<{
    state: PizzaDeliveryState;
    listeners: Set<Listener>;
  }>({
    state: {
      crust: CRUST_TYPES[0],
      size: SIZES[1],
      toppings: [TOPPINGS_LIST[0]],
    },
    listeners: new Set(),
  });

  const getState = useCallback((): PizzaDeliveryState => {
    return storeRef.current.state;
  }, []);

  const setState = useCallback(
    (updater: (state: PizzaDeliveryState) => PizzaDeliveryState) => {
      storeRef.current.state = updater(storeRef.current.state);

      storeRef.current.listeners.forEach((listener) => listener());
    },
    []
  );

  const subscribe = useCallback((listener: Listener) => {
    const { listeners } = storeRef.current;
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }, []);

  const store: PizzaDeliveryStore = {
    getState,
    setState,
    subscribe,
  };

  return (
    <PizzaDeliveryContext.Provider value={store}>
      {children}
    </PizzaDeliveryContext.Provider>
  );
};

export const usePizzaDeliveryStore = (): PizzaDeliveryStore => {
  const store = useContext(PizzaDeliveryContext);
  if (!store) {
    throw new Error(
      "usePizzaDeliveryStore must be used within a PizzaDeliveryProvider"
    );
  }
  return store;
};

export function usePizzaDeliverySelector<Selected>(
  selector: (state: PizzaDeliveryState) => Selected
): Selected {
  const store = usePizzaDeliveryStore();

  return React.useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState())
  );
}

export const useCrust = () => usePizzaDeliverySelector((state) => state.crust);
export const useSize = () => usePizzaDeliverySelector((state) => state.size);
export const useToppings = () =>
  usePizzaDeliverySelector((state) => state.toppings);

export const useSetCrust = () => {
  const store = usePizzaDeliveryStore();

  return useCallback(
    (newCrust: Crust) => {
      store.setState((state) => ({
        ...state,
        crust: newCrust,
      }));
    },
    [store]
  );
};

export const useSetSize = () => {
  const store = usePizzaDeliveryStore();

  return useCallback(
    (newSize: Size) => {
      store.setState((state) => ({
        ...state,
        size: newSize,
      }));
    },
    [store]
  );
};

export const useToggleTopping = () => {
  const store = usePizzaDeliveryStore();

  return useCallback(
    (topping: Topping) => {
      store.setState((state) => {
        const toppings = state.toppings.includes(topping)
          ? state.toppings.filter((t) => t !== topping)
          : [...state.toppings, topping];

        return {
          ...state,
          toppings,
        };
      });
    },
    [store]
  );
};
