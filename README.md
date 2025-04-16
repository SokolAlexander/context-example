# React Context Performance Exercise: Pizza Builder

This project is designed as an exercise to understand and address performance issues caused by overloaded React Contexts, using a Pizza Builder application theme.

## The Problem

The application simulates a simple Pizza Builder interface. It uses a single React Context (`PizzaBuilderContext` - although the file might still be named `StudioContext.tsx` initially) to manage all application state, including:

*   **User Info:** Customer Name, UI Theme (light/dark)
*   **Pizza Configuration:** Crust Type, Pizza Size, Selected Toppings
*   **Order Details:** Delivery Address, Order Timestamp, Calculated Total Price

Placing all this related and unrelated state into one context means that **any** change to **any** part of the context value (e.g., selecting a topping, changing the theme, typing an address) will cause **all** components consuming that context to re-render. This happens even if the component doesn't directly use the specific piece of state that changed (e.g., `PizzaOptions` re-rendering when the theme changes, or `CustomerDetails` re-rendering when a topping is added).

The calculated `totalPrice` also introduces coupling - changing the `deliveryAddress` or `toppings` affects the price, which might cause components only interested in the price (like `OrderSummary` or `PizzaPreview`) to re-render, but also potentially others if they consume the whole context.

You can observe this by running the app (`npm run dev`), interacting with the controls (changing size, crust, toppings, theme, name, address), and watching the red Render Counter badges (`R: X`) in the top-right corner of each component block.

## Your Task

Your goal is to refactor the application to improve performance by separating the concerns within the context.

1.  **Analyze `src/context/StudioContext.tsx`:** Identify the distinct categories of state being managed.
You should find at least three logical groups: User Info, Pizza Configuration, and Order/Price Details.
2.  **Create Separate Contexts:** Create new context files (e.g., `UserInfoContext.tsx`, `PizzaConfigContext.tsx`, `OrderDetailsContext.tsx`) for each distinct domain.
    *   Each new context should have its own state, types, provider component, and consumer hook (e.g., `useUserInfo`, `usePizzaConfig`).
    *   Decide where the `totalPrice` calculation logic best fits. Should it be in `OrderDetailsContext`? Should it be calculated within components that need it? Does it warrant its own small context?
3.  **Update the Main Provider:** Modify `src/context/StudioContext.tsx` (ideally rename it and its exports) or update `src/main.tsx`. The goal is to wrap the `App` component with the providers for *all* the new, separated contexts.
4.  **Update Components:** Refactor the components (`App.tsx`, `PizzaOptions.tsx`, `OrderSummary.tsx`, `CustomerDetails.tsx`, `PizzaPreview.tsx`) to consume only the specific context(s) they need using the new hooks you created.
5.  **Verify:** Run the application again. Interact with the controls and observe the Render Counters. Components should now only re-render (increment their counter) when the *relevant* data they subscribe to actually changes.
    *   For example, changing the theme in `CustomerDetails` should ideally *only* re-render `CustomerDetails` and `App` (if `App` uses the theme), not `PizzaOptions` or `PizzaPreview`.
    *   Adding a topping in `PizzaOptions` should ideally *only* re-render `PizzaOptions`, `PizzaPreview` (if it shows toppings/price), and `OrderSummary` (if it shows price), but not `CustomerDetails`.

**Bonus:** Can the price calculation be made more efficient or decoupled further? How would you handle dependencies between contexts if, for example, certain toppings were only available for certain sizes (though this isn't implemented here)?

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
4.  Open the developer console to observe the *detailed* render logs from the `RenderCounter` component if needed.
5.  Observe the red `R: X` badges in the UI and interact with the controls to see the re-renders.
6.  Start refactoring!
