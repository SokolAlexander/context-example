import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React Context', completed: false },
    { id: 2, text: 'Understand re-rendering', completed: false },
  ]);

  const addTodo = useCallback((text: string) => {
    setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]);
  }, []);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const value = useMemo(() => ({
    todos,
    addTodo,
    toggleTodo,
  }), [todos, addTodo, toggleTodo]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
