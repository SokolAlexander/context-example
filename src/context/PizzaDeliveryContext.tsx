import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export const TOPPINGS_LIST = ["Pepperoni", "Mushrooms", "Onions", "Sausage"];
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

type StateSubscription = {
  id: number;
  selector: (state: PizzaDeliveryState) => any;
  callback: () => void;
};

let currentState: PizzaDeliveryState = {
  crust: CRUST_TYPES[0],
  size: SIZES[1],
  toppings: [TOPPINGS_LIST[0]],
};

let subscriptions: StateSubscription[] = [];
let nextSubscriptionId = 1;

const pizzaStore = {
  getState: () => currentState,

  setState: (newState: Partial<PizzaDeliveryState>) => {
    currentState = { ...currentState, ...newState };

    subscriptions.forEach((sub) => {
      sub.callback();
    });
  },

  subscribe: (
    callback: () => void,
    selector: (state: PizzaDeliveryState) => any
  ) => {
    const id = nextSubscriptionId++;
    subscriptions.push({ id, selector, callback });

    return () => {
      subscriptions = subscriptions.filter((sub) => sub.id !== id);
    };
  },
};

const PizzaDeliveryContext = createContext<typeof pizzaStore | null>(null);

interface PizzaDeliveryProviderProps {
  children: React.ReactNode;
}

export const PizzaDeliveryProvider: React.FC<PizzaDeliveryProviderProps> = ({
  children,
}) => {
  return (
    <PizzaDeliveryContext.Provider value={pizzaStore}>
      {children}
    </PizzaDeliveryContext.Provider>
  );
};

export const usePizzaDeliveryStore = () => {
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
  const [value, setValue] = useState<Selected>(() =>
    selector(store.getState())
  );

  useEffect(() => {
    const handleChange = () => {
      const newValue = selector(store.getState());
      if (newValue !== value) {
        setValue(newValue);
      }
    };

    const unsubscribe = store.subscribe(handleChange, selector);
    return unsubscribe;
  }, [store, selector, value]);

  return value;
}

export const useCrust = () => {
  return usePizzaDeliverySelector((state) => state.crust);
};

export const useSize = () => {
  return usePizzaDeliverySelector((state) => state.size);
};

export const useToppings = () => {
  return usePizzaDeliverySelector((state) => state.toppings);
};

export const useSetCrust = () => {
  const store = usePizzaDeliveryStore();
  return useCallback(
    (newCrust: Crust) => {
      store.setState({ crust: newCrust });
    },
    [store]
  );
};

export const useSetSize = () => {
  const store = usePizzaDeliveryStore();
  return useCallback(
    (newSize: Size) => {
      store.setState({ size: newSize });
    },
    [store]
  );
};

export const useToggleTopping = () => {
  const store = usePizzaDeliveryStore();
  return useCallback(
    (topping: Topping) => {
      const currentToppings = store.getState().toppings;
      const newToppings = currentToppings.includes(topping)
        ? currentToppings.filter((t) => t !== topping)
        : [...currentToppings, topping];

      store.setState({ toppings: newToppings });
    },
    [store]
  );
};
