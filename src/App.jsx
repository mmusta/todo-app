/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef, useState } from 'react';

function App() {
  const [isEditableList, setIsEditableList] = useState([]);
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);
  const handleAddTodoClick = () => {
    const newTodo = inputRef.current.value;
    setTodos(todos.concat(newTodo));
    inputRef.current.value = '';
    setIsEditableList(isEditableList.concat(false));
  };
  const handleDeleteClick = (index) => {
    const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    setTodos(newTodos);
    const newBooleans = [...isEditableList.slice(0, index), ...isEditableList.slice(index + 1)];
    setIsEditableList(newBooleans);
  };
  const handleEditClick = (index) => {
    const newBooleans = [...isEditableList.slice(0, index),
      !isEditableList[index], ...isEditableList.slice(index + 1)];
    setIsEditableList(newBooleans);
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
            {isEditableList[index] ? <input /> : <span>{todo}</span> }
            <button type="button" onClick={() => handleDeleteClick(index)}>Delete Todo</button>
            <button type="button" onClick={() => handleEditClick(index)}>Edit Todo</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
