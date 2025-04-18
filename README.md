# React Context Performance Exercise: Pizza Builder

This project is designed as an exercise to understand and address performance issues caused by overloaded React Contexts, using a Pizza Builder application.

## The Problem

The application simulates a simple Pizza Builder interface. It uses a single React Context (`PizzaBuilderContext`) to manage all application state, including:

- **User Info:** Customer Name, UI Theme (light/dark)
- **Pizza Configuration:** Crust Type, Pizza Size, Selected Toppings
- **Order Details:** Delivery Address, Order Timestamp, Calculated Total Price

Placing all this related and unrelated state into one context means that **any** change to **any** part of the context value (e.g., selecting a topping, changing the theme, typing an address) will cause **all** components consuming that context to re-render. This happens even if the component doesn't directly use the specific piece of state that changed (e.g., `PizzaOptions` re-rendering when the order creation timestamp changes, or `CustomerDetails` re-rendering when a topping is added).

**Important Note:** This exercise is specifically focused on minimizing the number of component re-renders and optimizing render time. Other aspects of application performance (such as memory usage, network efficiency, or bundle size) are not the primary concern for this task. The goal is to ensure components only re-render when the specific data they depend on changes, not when unrelated state is updated.

## RenderCounter

The `RenderCounter` component is a utility component used throughout the application to track and display the number of times a component rerenders. It's important to note that the presence of this component is purely for demonstration and debugging purposes - it does not affect or increase the number of rerenders in any way. It simply observes and displays the rerender count of its parent component.

## Your Task

Your goal is to refactor the application to improve performance by separating the concerns within the context, and ensure that components only re-render when the _relevant_ data they need actually changes.

# note - this part below is not intended to be exposed, it's just for us to stay aligned

**Analyze `src/context/PizzaBuilderContext.tsx`:** Identify the distinct categories of state being managed.

You should find at least three logical groups: User Info, Pizza Configuration, and Order/Price Details. 2. **Create Separate Contexts:** Create new context files (e.g., `UserInfoContext.tsx`, `PizzaConfigContext.tsx`, `OrderDetailsContext.tsx`) for each distinct domain.
_ Each new context should have its own state, types, provider component, and consumer hook (e.g., `useUserInfo`, `usePizzaConfig`).
_ Decide where the `totalPrice` calculation logic best fits. Should it be in `OrderDetailsContext`? Should it be calculated within components that need it? Does it warrant its own small context? 3. **Update the Main Provider:** Modify `src/context/StudioContext.tsx` (ideally rename it and its exports) or update `src/main.tsx`. The goal is to wrap the `App` component with the providers for _all_ the new, separated contexts. 4. **Update Components:** Refactor the components (`App.tsx`, `PizzaOptions.tsx`, `OrderSummary.tsx`, `CustomerDetails.tsx`, `PizzaPreview.tsx`) to consume only the specific context(s) they need using the new hooks you created. 5. **Verify:** Run the application again. Interact with the controls and observe the Render Counters. Components should now only re-render (increment their counter) when the _relevant_ data they subscribe to actually changes.

- For example, changing the theme in `CustomerDetails` should ideally _only_ re-render `CustomerDetails` and `App` (if `App` uses the theme), not `PizzaOptions` or `PizzaPreview`.
- Adding a topping in `PizzaOptions` should ideally _only_ re-render `PizzaOptions`, `PizzaPreview` (if it shows toppings/price), and `OrderSummary` (if it shows price), but not `CustomerDetails`.

**Bonus:** Can the price calculation be made more efficient or decoupled further?

**Bonus 2:** Can we make the component only rely on the PART of the context it needs without separating the contexts further (think of selectors in the libs like `zustand`)?

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
2.  **Run the Development Server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
3.  Open your browser to the URL provided (usually `http://localhost:5173`).
4.  Check the red `R: X` badges in the UI and interact with the controls to see the re-renders.
5.  Start refactoring!

## Solution Implementation

This repository provides one possible solution to the context performance problems. Here's how the solution addresses the issues:

### 1. Context Separation

The monolithic `PizzaDeliveryContext` has been split into separate contexts:

- **PizzaDeliveryContext**: Focused only on pizza configuration (size, crust, toppings)
- **UserContext**: Manages user-related information (customer name, delivery address)
- **ThemeContext**: Handles UI theme state (light/dark) separately from other application data

### 2. Custom Hook for Cross-Context Calculations

One way to solve the total price calculation problem is to couple contexts together by having one context consume another.
Another way out of this is a component or a hook that consumes both contexts independently and calculates the price - this is the approach taken in this solution.

- **usePizzaPrice**: This hook consumes both contexts independently and calculates the price
  - It gets pizza configuration from `PizzaDeliveryContext`
  - It gets delivery address from `UserContext`
  - The price calculation logic and constants were moved from the original context to this hook

### 3. Component Optimizations

Components were refactored to use only the specific contexts or hooks they need:

- **App**: Uses `ThemeContext` to manage and apply the current theme
- **PizzaOptions**: Uses only `PizzaDeliveryContext` for pizza configuration
- **CustomerDetails**: Uses `UserContext` for customer information and `ThemeContext` for theme toggling
- **OrderSummary**: Uses `UserContext` for customer details and `usePizzaPrice` for price calculation
- **PizzaPreview**: Uses `PizzaDeliveryContext` for pizza visualization and `usePizzaPrice` for price

### 4. The results

1. **Targeted Re-renders**: Components only re-render when their specific data changes

   - Changing the theme only affects components using `ThemeContext` (mainly `App` and `CustomerDetails`)
   - Changing the delivery address only affects `OrderSummary` and components that use `usePizzaPrice`
   - Changing toppings only affects pizza-related components

2. **Decoupled State Management**: Each context manages only related state

   - `PizzaDeliveryContext` focuses solely on pizza configuration
   - `UserContext` handles only user information
   - `ThemeContext` manages only UI theme preferences

3. **Isolated Calculation Logic**: The price calculation is isolated in a custom hook

Note that while our components now depend only on relative contexts, they are still re-rendering when any value from the contexts changes, even if the component doesn't use that value - e.g. `CrustSelector` re-renders when the pizza size changes.

What can be done about this?

## Advanced Solution: Selector Pattern and Store Implementation

This branch demonstrates an advanced approach that addresses the remaining performance issue. Even after separating contexts, components still re-render when any value in a context changes, even if they only use a small part of that context. Here's how the advanced solution tackles this problem:

### 1. Custom Store Pattern

Instead of using React's built-in state management, the solution implements a custom store pattern similar to Redux or Zustand. This creates a state container with fine-grained control over state updates, enabling more efficient subscription patterns.

### 2. Granular Selectors

The most significant improvement is the use of selectors that allow components to subscribe only to specific pieces of state. This selective subscription is crucial because:

- Components only re-render when their specific data changes
- Even within a single context, components can subscribe to just what they need
- It eliminates the common problem of "over-rendering" in context-based applications

### 3. Benefits Over the Basic Solution

While the previous solution separated contexts, this advanced implementation:

1. **Eliminates Unnecessary Renders**: Components only re-render when the exact piece of state they use changes

   - If you change the crust, only CrustSelector and components that display crust will re-render
   - If you change the toppings, SizeSelector and CrustSelector remain stable

2. **Scales Better**: As your application grows, this pattern maintains performance by keeping renders targeted

This implementation demonstrates how to solve the context performance problem not just through separation of concerns but through intelligent subscription patterns that minimize component re-renders.

## Moving forward

Now we have a sort of a own-implemented state management system, that still has some issues, at least:

- Hard to debug and track changes
- No built-in middleware or side effects handling
- No built-in computed values etc.
- No way to access the store outside of a react component

Depending on how we want to solve this, we could either:
A. ensure 1-way data flow, add reducer, support for middleware - this way redux-like state management is possible
B. add reactivity to the store, use e.g. RxJS. Update state with actions, add computed values and move towards Mobx-like state management
C. Get rid of the React context and store the state in a plain object. Still use selectors, but the state is not bound to react. Expose functions to get and set state - this is more zustand-like approach.
D. Support splitting the state into multiple stores, decentralize the state management and allow atomic updates - this is more like a Jorai.

Anyway, we're not gonna reimplement the state management system oursleves (that way madness lies). But now that we know a bit more about the approaches, we can make a more informed decision when choosing the most appropriate library for the job.
