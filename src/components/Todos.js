import React, { useContext, useState } from "react";
import { CredentialsContext } from "../App";

export default function Todos() {
  const [todos, setTodos] = useState([{ text: 'To dos' }]);
  const [todoText, setTodoText] = useState("");
  const [credentials] = useContext(CredentialsContext);

  const persist = (newTodos) => {
    fetch(`http://localhost:3000/Todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Basic ${credentials.username}:${credentials.password}`
      },
      body: JSON.stringify({
        todos
      }),
    })
      .then(() => { });
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoText) return;
    const newTodo = { checked: false, text: todoText };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodoText("");
    persist(newTodos);
  };

  const toggleTodo = (index) => {
    const newTodoList = [...todos];
    newTodoList[index].checked = !newTodoList[index].checked;
    setTodos(newTodoList);
  };

  return (
    <div>
      {todos.map((todo, index) => (
        <div key={index}>
          <input onChange={() => toggleTodo(index)} type="checkbox" />
          <label>{todo.text}</label>
        </div>
      ))}
      <br />
      <form onSubmit={addTodo}>
        <input
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          type="text"
        />
        <button type="submit">ADD</button>
      </form>
    </div>
  );
}
