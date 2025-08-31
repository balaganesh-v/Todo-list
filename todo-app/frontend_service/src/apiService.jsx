import axios from "axios";

// point directly to your backend (FastAPI/Flask on 8000)
const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: { "Content-Type": "application/json" },
});

export const fetchTodos = async () => {
  const response = await API.get("/todos/");
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await API.post("/todos/", todo);
  return response.data;
};

export const updateTodo = async (id, updatedTodo) => {
  const response = await API.put(`/todos/${id}`, updatedTodo);
  return response.data;
};

export async function analyzeTask(text) {
  const res = await fetch("http://127.0.0.1:8000/ai/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  return res.json();
}


export const deleteTodo = async (id) => {
  const response = await API.delete(`/todos/${id}`);
  return response.data;
};
