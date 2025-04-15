import { memo, useCallback } from 'react';
import { useTodoContext } from '../../context/TodoContext';
import { RenderCounter } from '../RenderCounter';
import ThemedContainer from '../common/ThemedContainer';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoItem = memo(({ todo, onToggle }: { todo: Todo; onToggle: () => void }) => {
  const todoTextStyle = {
    marginLeft: '10px',
    textDecoration: todo.completed ? 'line-through' : 'none',
    opacity: todo.completed ? 0.7 : 1,
  };

  return (
    <div style={{ margin: '10px 0' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
      />
      <span style={todoTextStyle}>
        {todo.text}
      </span>
    </div>
  );
});

TodoItem.displayName = 'TodoItem';

const TodoList = () => {
  const { todos, toggleTodo } = useTodoContext();

  const handleToggle = useCallback((id: number) => () => {
    toggleTodo(id);
  }, [toggleTodo]);

  return (
    <ThemedContainer>
      <RenderCounter componentName="TodoList" />
      <h2>Todo List</h2>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle(todo.id)}
        />
      ))}
    </ThemedContainer>
  );
};

export default memo(TodoList); 