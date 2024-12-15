import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadTasks,
  addTask,
  deleteTask,
  toggleComplete,
  editTask,
  setEditingTaskId,
  setError,
  clearError,
} from "../../slices/tasksSlice";
import { logout } from "../../slices/authSlice";
import "./taskManagement.css";

const TaskManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const tasks = useSelector((state) => state?.tasks?.tasks);
  const editingTaskId = useSelector((state) => state?.tasks?.editingTaskId);
  const error = useSelector((state) => state?.tasks?.error);

  const [taskInput, setTaskInput] = useState("");
  const [editedTaskTitle, setEditedTaskTitle] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (user) {
      dispatch(loadTasks(user.username));
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleAddTask = () => {
    if (taskInput.trim() === "") {
      dispatch(setError("Task title cannot be empty!"));
      return;
    }

    const newTask = { id: Date.now(), title: taskInput, completed: false };
    dispatch(addTask({ username: user.username, task: newTask }));
    setTaskInput("");
    dispatch(clearError());
  };

  const handleEditTask = (taskId, newTitle) => {
    if (newTitle.trim() === "") {
      dispatch(setError("Task title cannot be empty!"));
      return;
    }

    dispatch(editTask({ username: user.username, taskId, newTitle }));
    dispatch(setEditingTaskId(null));
    setEditedTaskTitle("");
    dispatch(clearError());
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask({ username: user.username, taskId }));
  };

  const handleToggleComplete = (taskId) => {
    dispatch(toggleComplete({ username: user.username, taskId }));
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterStatus("all");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "completed") return task.completed;
    if (filterStatus === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div className="task-page-container">
      <header className="task-header">
        <div className="header-left">
          <h1 className="task-title">Task Management</h1>
          <span className="username">
            {user ? `Hello, ${user.username}` : ""}
          </span>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="task-content">
        <div className="task-form">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="task-input"
            placeholder="Enter task title"
          />
          <button onClick={handleAddTask} className="add-task-button">
            Add Task
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="filter-section">
          <select
            value={filterStatus}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed Tasks</option>
            <option value="incomplete">Incomplete Tasks</option>
          </select>
          <button onClick={handleResetFilter} className="reset-filter-button">
            Reset Filter
          </button>
        </div>

        <ul className="task-list">
          {filteredTasks?.length > 0 ? (
            filteredTasks.map((task) => (
              <li
                key={task.id}
                className={`task-item ${task.completed ? "completed" : ""}`}
              >
                {editingTaskId === task.id ? (
                  <div className="edit-task-container">
                    <input
                      type="text"
                      value={editedTaskTitle}
                      onChange={(e) => setEditedTaskTitle(e.target.value)}
                      className="task-input"
                      placeholder="Edit task title"
                    />
                    <button
                      className="save-edit-button"
                      onClick={() => handleEditTask(task.id, editedTaskTitle)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <span>{task.title}</span>
                    <button
                      className="toggle-complete-button"
                      onClick={() => handleToggleComplete(task.id)}
                    >
                      {task.completed ? "Undo" : "Complete"}
                    </button>
                    <button
                      className="edit-task-button"
                      onClick={() => {
                        dispatch(setEditingTaskId(task.id));
                        setEditedTaskTitle(task.title);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-task-button"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))
          ) : (
            <p className="no-tasks-message">No tasks available!</p>
          )}
        </ul>
      </main>
    </div>
  );
};

export default TaskManagement;
