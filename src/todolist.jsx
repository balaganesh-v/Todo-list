import React, { useState } from 'react';

function TodoList() {

  const [tasks, setTasks] = useState([ "Woke up early","Walk with a dog","Daily run in the morning"]);
  const [newTask, setNewTask] = useState("");

  // ✅ Small helper function for input change
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

      {/* Input with helper function */}
      <input type="text" placeholder="Enter a task"
        value={newTask} onChange={handleTaskInput} />

      <button onClick={addNewTask}>➕ Add</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => removeTask(index)}>🗑️</button>
            <button onClick={() => moveTaskIntoUp(index)}>👆</button>
            <button onClick={() => moveTaskIntoDown(index)}>👇</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
