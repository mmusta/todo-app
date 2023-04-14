/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);
  const handleAddTodoClick = () => {
    const newTodo = inputRef.current.value;
    setTodos(todos.concat(newTodo));
  };
  const handleDeleteClick = (index) => {
    const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div>
        <label htmlFor="todo-title">Todo Title: </label>
        <input id="todo-title" ref={inputRef} />
      </div>
      <button onClick={handleAddTodoClick} type="button">
        Add Todo
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo}>
            {todo}
            <button type="button" onClick={() => handleDeleteClick(index)}>Delete Todo</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
