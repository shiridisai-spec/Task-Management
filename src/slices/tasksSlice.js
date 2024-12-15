import { createSlice } from "@reduxjs/toolkit";

const loadTasksFromLocalStorage = (username) => {
  const tasks = localStorage.getItem(`tasks_${username}`);
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (username, tasks) => {
  localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    editingTaskId: null,
    error: "",
  },
  reducers: {
    loadTasks(state, action) {
      const username = action.payload;
      state.tasks = loadTasksFromLocalStorage(username);
    },
    addTask(state, action) {
      const { username, task } = action.payload;
      state.tasks.push(task);
      saveTasksToLocalStorage(username, state.tasks);
    },
    deleteTask(state, action) {
      const { username, taskId } = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      saveTasksToLocalStorage(username, state.tasks);
    },
    toggleComplete(state, action) {
      const { username, taskId } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      saveTasksToLocalStorage(username, state.tasks);
    },
    editTask(state, action) {
      const { username, taskId, newTitle } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      );
      saveTasksToLocalStorage(username, state.tasks);
    },
    setEditingTaskId(state, action) {
      state.editingTaskId = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = "";
    },
  },
});

export const {
  loadTasks,
  addTask,
  deleteTask,
  toggleComplete,
  editTask,
  setEditingTaskId,
  setError,
  clearError,
} = tasksSlice.actions;

export default tasksSlice.reducer;
