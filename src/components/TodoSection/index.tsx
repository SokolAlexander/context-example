import { RenderCounter } from '../RenderCounter';
import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';
import { useAppContext } from '../../context/AppContext';

export const TodoSection = () => {
  const { preferences } = useAppContext();
  
  const borderColor = preferences.theme === 'dark' ? '#0056b3' : '#007bff';
  
  return (
    <div style={{ 
      position: 'relative',
      padding: '20px',
      border: `2px solid ${borderColor}`,
      borderRadius: '8px',
      margin: '20px',
      flex: 1,
      backgroundColor: preferences.theme === 'dark' ? '#2a2a2a' : '#ffffff',
      transition: 'all 0.3s ease',
    }}>
      <RenderCounter componentName="TodoSection" />
      <h2>Todo Management</h2>
      <AddTodo />
      <TodoList />
    </div>
  );
}; 