/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { nanoid } from 'nanoid';

function App() {
  const [isEditableList, setIsEditableList] = useState([]);
  /** @type {[{id: string, title: string, isCompleted: boolean}[],]} */
  const [todos, setTodos] = useState([]);
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

  const handleCheckboxChange = (currentIndex) => {
    const updatedTodos = todos.map((todo, index) => {
      if (index === currentIndex) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newTodo = {
      id: nanoid(),
      title: event.target[0].value,
      isCompleted: false,
    };
    setTodos(todos.concat(newTodo));
    event.target[0].value = '';
    setIsEditableList(isEditableList.concat(false));
  };
  return (
    <div className="app">
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="todo-title">Todo Title: </label>
          <input id="todo-title" />
        </div>
        <button type="submit">
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.isCompleted} onChange={() => handleCheckboxChange(index)} />
            {isEditableList[index] ? <input /> : <span>{todo.title}</span> }
            <button type="button" onClick={() => handleDeleteClick(index)}>Delete Todo</button>
            <button type="button" onClick={() => handleEditClick(index)}>Edit Todo</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
