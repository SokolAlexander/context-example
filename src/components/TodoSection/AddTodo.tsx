import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { RenderCounter } from '../RenderCounter';

export const AddTodo = () => {
  const [text, setText] = useState('');
  const { addTodo, preferences } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <div style={{ 
      position: 'relative', 
      padding: '20px', 
      border: `1px solid ${preferences.theme === 'dark' ? '#444' : '#ccc'}`,
      margin: '10px',
      backgroundColor: preferences.theme === 'dark' ? '#333' : '#f8f8f8',
      transition: 'all 0.3s ease',
    }}>
      <RenderCounter componentName="AddTodo" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add new todo"
          style={{ 
            padding: '5px', 
            marginRight: '10px',
            backgroundColor: preferences.theme === 'dark' ? '#444' : '#fff',
            border: `1px solid ${preferences.theme === 'dark' ? '#555' : '#ccc'}`,
            color: preferences.theme === 'dark' ? '#fff' : '#000',
          }}
        />
        <button 
          type="submit"
          style={{
            padding: '5px 10px',
            backgroundColor: preferences.theme === 'dark' ? '#0056b3' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}; 