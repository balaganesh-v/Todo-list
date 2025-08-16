import React, { useState } from 'react';
import './index.css';

function TodoList() {

  const [tasks, setTasks] = useState(["Woke up early", "Walk with a dog", "Daily run in the morning"]);
  const [newTask, setNewTask] = useState("");

  function handleTaskInput(event) {
    setNewTask(event.target.value);
  }

  function addNewTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  }

  function removeTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function moveTaskIntoUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index - 1], updatedTasks[index]] =
        [updatedTasks[index], updatedTasks[index - 1]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskIntoDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index + 1], updatedTasks[index]] =
        [updatedTasks[index], updatedTasks[index + 1]];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className="todo-list-app">
      <h2>ToDo List</h2>

      {/* Input Section */}
      <div className="input-section">
        <input type="text" placeholder="Enter a task"
          value={newTask} onChange={handleTaskInput} />
        <button className="add-btn" onClick={addNewTask}>➕ Add</button>
      </div>

      {/* Task List */}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="todo-task">{task}</span>
            <div className="action-buttons">
              <button className="delete-btn" onClick={() => removeTask(index)}>🗑️</button>
              <button className="up-btn" onClick={() => moveTaskIntoUp(index)}>👆</button>
              <button className="down-btn" onClick={() => moveTaskIntoDown(index)}>👇</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
