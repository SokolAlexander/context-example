# Pizza Builder with Optimized Context

This project demonstrates how to implement a subscription-based React context with specialized hooks that prevent unnecessary re-renders when using context values.

## The Problem

In a standard React Context implementation, any component that consumes a context using `useContext` will re-render whenever any value in that context changes, even if the component only uses a subset of the context values.

For example, the `OrderSummary` component only needs the `totalPrice` from the `PizzaDeliveryContext`, but it would re-render when the pizza size, crust, or toppings change, even if the price remains the same.

## The Solution

We've implemented two complementary approaches:

1. A subscription-based context using React's useSyncExternalStore hook
2. A specialized cross-context hook for calculating total price

### Subscription-Based Context

Our approach:
- Uses a useRef to store an immutable state object and a listeners set
- Provides a subscription mechanism that allows components to listen for specific state changes
- Creates selector hooks that only trigger re-renders when the selected values change

### Specialized useTotalPrice Hook

For the total price calculation (which depends on values from multiple contexts), we've created a specialized hook that:
- Pulls data from both contexts (pizza configuration and user details)
- Uses useMemo to recalculate only when dependencies change
- Ensures components only re-render when the actual calculated price changes

## Key Components

### PizzaDeliveryContext

The context provides a store with these methods:
- `getState()` - Returns the current state
- `setState(updater)` - Updates the state immutably
- `subscribe(listener)` - Registers a listener function that's called when state changes

### usePizzaDeliverySelector

This custom hook allows components to subscribe to specific slices of state:

```typescript
export function usePizzaDeliverySelector<Selected>(
  selector: (state: PizzaDeliveryState) => Selected
): Selected {
  const store = usePizzaDeliveryStore();
  
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState())
  );
}
```

### useTotalPrice Hook

Our specialized hook for calculating the total price:

```typescript
export const useTotalPrice = (): number => {
  // Get pizza details from PizzaDeliveryContext
  const size = useSize();
  const crust = useCrust();
  const toppings = useToppings();
  
  // Get delivery address from UserContext
  const { deliveryAddress } = useUserContext();
  
  // Calculate total price based on all dependencies
  return useMemo(() => {
    let price = BASE_PRICE[size] || 10;
    price += CRUST_PRICE[crust] || 0;
    price += toppings.length * PRICE_PER_TOPPING;
    price += (deliveryAddress?.length || 0) * ADDRESS_COMPLEXITY_FACTOR;
    
    return parseFloat(price.toFixed(2));
  }, [size, crust, toppings, deliveryAddress]);
};
```

### Specialized Selector Hooks

For convenience, we've created specialized hooks for common state slices:
- `useCrust()` - Only re-renders when the crust changes
- `useSize()` - Only re-renders when the size changes
- `useToppings()` - Only re-renders when the toppings change

### Action Hooks

We also provide hooks for state updates:
- `useSetCrust()`
- `useSetSize()`
- `useToggleTopping()`

## Demo Components

The project includes a `ContextPerformanceDemo` component that demonstrates the benefits of our approach:

- `StoreConsumer` - Uses the store directly and re-renders on any state change
- `PriceSubscriber` - Only re-renders when the price inputs change
- `SizeSubscriber` - Only re-renders when the size changes
- `ToppingSubscriber` - Only re-renders when the toppings change

## Running the Project

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser to the provided URL (usually http://localhost:5173)

4. Observe the render counts (red badges) as you interact with the UI

## Benefits

- **Performance Improvements**: Components only re-render when their specific dependencies change
- **Decoupled Components**: Components can subscribe to just the data they need
- **Cross-Context Calculations**: Specialized hooks can combine data from multiple contexts
- **Fine-grained Updates**: State can be updated granularly without causing cascading re-renders
- **Debugging**: Render counters help visualize which components are re-rendering and when
