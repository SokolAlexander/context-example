# React Context Re-rendering Exercise

This project demonstrates a common pitfall when using React Context: unnecessary re-renders caused by storing too much state in a single context.

## Learning Objectives

1. Understand how React Context updates trigger re-renders
2. Observe how changes to one part of a context can cause unnecessary re-renders in unrelated components
3. Learn best practices for structuring context in React applications

## The Problem

This demo app has two independent sections:
- A Todo Management section
- A User Preferences section

Both sections use the same context (`AppContext`), but each section only needs a portion of the context's state:
- Todo components only need the `todos` state and related functions
- Preferences components only need the `preferences` state and related functions

However, because they share the same context, when you update state in one section (e.g., adding a todo), components in the other section (e.g., theme toggle) will re-render unnecessarily.

## How to Use

1. Start the development server:
   ```bash
   npm install
   npm run dev
   ```

2. Open the app in your browser and observe the render counters in the top-right corner of each component.

3. Try the following actions and watch the render counts:
   - Add a new todo
   - Toggle a todo's completion status
   - Change the theme
   - Adjust the font size

Notice how components re-render even when the changes don't affect them!

## Solution Preview

The solution to this problem would be to split the context into smaller, more focused contexts:
- `TodoContext` for todo-related state
- `PreferencesContext` for user preferences

This way, updates to todos would only trigger re-renders in todo-related components, and updates to preferences would only affect preference-related components.

## Exercise Tasks

1. Run the app and document which components re-render for each user action
2. Think about how you would restructure the contexts to minimize unnecessary re-renders
3. Try implementing the solution by splitting the context into two separate contexts

## Key Takeaways

- Context is not a replacement for all state management
- Consider the scope and relationships of your state when designing contexts
- Smaller, focused contexts can lead to better performance
- Use the React DevTools and render counters to identify unnecessary re-renders
