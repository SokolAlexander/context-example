import { createContext, useContext, useState, ReactNode } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  fontSize: number;
}

interface AppContextType {
  // Todo-related state
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  
  // User preferences state
  preferences: UserPreferences;
  updateTheme: (theme: 'light' | 'dark') => void;
  updateFontSize: (size: number) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React Context', completed: false },
    { id: 2, text: 'Understand re-rendering', completed: false },
  ]);

  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    fontSize: 16,
  });

  const addTodo = (text: string) => {
    setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const updateTheme = (theme: 'light' | 'dark') => {
    setPreferences(prev => ({ ...prev, theme }));
  };

  const updateFontSize = (fontSize: number) => {
    setPreferences(prev => ({ ...prev, fontSize }));
  };

  return (
    <AppContext.Provider value={{
      todos,
      addTodo,
      toggleTodo,
      preferences,
      updateTheme,
      updateFontSize,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 