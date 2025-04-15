import { useState, useCallback, memo } from 'react';
import { useTodoContext } from '../../context/TodoContext';
import { RenderCounter } from '../RenderCounter';
import ThemedContainer, { ThemedStyles } from '../common/ThemedContainer';

const AddTodo = () => {
  const [text, setText] = useState('');
  const { addTodo } = useTodoContext();

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  }, [text, addTodo]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  return (
    <ThemedContainer>
      {(styles: ThemedStyles) => (
        <>
          <RenderCounter componentName="AddTodo" />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={text}
              onChange={handleChange}
              placeholder="Add new todo"
              style={styles.input}
            />
            <button 
              type="submit"
              style={styles.button}
            >
              Add
            </button>
          </form>
        </>
      )}
    </ThemedContainer>
  );
};

export default memo(AddTodo); 