import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../apiService";

// 1. Create Context
const TodoContext = createContext();

// 2. Provider Component
export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  // Load todos from backend once
  useEffect(() => {
    fetchTodos()
      .then((todosFromServer) => setTodos(todosFromServer))
      .catch((error) => console.error("❌ Failed to fetch todos:", error));
  }, []);

  // Add Todo
  const addTodo = async (todo) => {
    try {
      const newTodo = await createTodo(todo);
      setTodos((todos) => [...todos, newTodo]);
    } catch (error) {
      console.error("❌ Failed to add todo:", error);
    }
  };

  // Toggle completed
  const toggleComplete = async (id, completed) => {
    try {
      const foundTodo = todos.find((todo) => todo.id === id);
      if (!foundTodo) return;

      const updatedTodo = await updateTodo(id, { ...foundTodo, completed });
      setTodos((todos) =>
        todos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("❌ Failed to update todo:", error);
    }
  };

  // Edit Todo (title/description)
  const editTodo = async (id, updatedFields) => {
    try {
      const foundTodo = todos.find((todo) => todo.id === id);
      if (!foundTodo) return;

      const updatedTodo = await updateTodo(id, { ...foundTodo, ...updatedFields });
      setTodos((todos) =>
        todos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("❌ Failed to edit todo:", error);
    }
  };

  // Delete Todo
  const removeTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("❌ Failed to delete todo:", error);
    }
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleComplete, removeTodo, editTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

// 3. Custom Hook
export const useTodos = () => useContext(TodoContext);
