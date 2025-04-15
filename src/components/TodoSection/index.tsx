import { memo, useMemo } from 'react';
import { RenderCounter } from '../RenderCounter';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import { usePreferencesContext } from '../../context/PreferencesContext';

const TodoSection = () => {
  const { preferences } = usePreferencesContext();
  
  const styles = useMemo(() => ({
    container: {
      position: 'relative' as const,
      padding: '20px',
      border: `2px solid ${preferences.theme === 'dark' ? '#0056b3' : '#007bff'}`,
      borderRadius: '8px',
      margin: '20px',
      flex: 1,
      backgroundColor: preferences.theme === 'dark' ? '#2a2a2a' : '#ffffff',
      transition: 'all 0.3s ease',
    }
  }), [preferences.theme]);
  
  return (
    <div style={styles.container}>
      <RenderCounter componentName="TodoSection" />
      <h2>Todo Management</h2>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default memo(TodoSection); 