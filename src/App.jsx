/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './App.scss';

const todoSchema = yup.object({
  todoTitle: yup.string().min(4).required(),
}).required();

function App() {
  const {
    handleSubmit, register, setValue, control, formState: { errors },
  } = useForm({
    defaultValues: {
      todoTitle: '',
    },
    resolver: yupResolver(todoSchema),
  });

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

  const onSubmit = (formValues) => {
    const newTodo = {
      id: nanoid(),
      title: formValues.todoTitle,
      isCompleted: false,
    };
    setTodos(todos.concat(newTodo));
    setValue('todoTitle', '');
    setIsEditableList(isEditableList.concat(false));
  };
  return (
    <div className="app">
      <DevTool control={control} placement="top-right" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="todo-title">Todo Title: </label>
          <input {...register('todoTitle')} />
          {errors.todoTitle && <div className="app__error-message">{errors.todoTitle.message}</div>}
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
