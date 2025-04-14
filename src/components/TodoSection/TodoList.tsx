import { useAppContext } from '../../context/AppContext';
import { RenderCounter } from '../RenderCounter';

export const TodoList = () => {
  const { todos, toggleTodo, preferences } = useAppContext();

  return (
    <div style={{ 
      position: 'relative', 
      padding: '20px', 
      border: `1px solid ${preferences.theme === 'dark' ? '#444' : '#ccc'}`,
      margin: '10px',
      backgroundColor: preferences.theme === 'dark' ? '#333' : '#f8f8f8',
      transition: 'all 0.3s ease',
    }}>
      <RenderCounter componentName="TodoList" />
      <h2>Todo List</h2>
      {todos.map(todo => (
        <div key={todo.id} style={{ margin: '10px 0' }}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span style={{ 
            marginLeft: '10px',
            textDecoration: todo.completed ? 'line-through' : 'none',
            opacity: todo.completed ? 0.7 : 1,
          }}>
            {todo.text}
          </span>
        </div>
      ))}
    </div>
  );
}; 