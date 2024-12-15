import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/login-page/LoginPage";
import TaskManagementPage from "./pages/task-management-page/TaskManagementPage";
import { setUserFromLocalStorage } from "./slices/authSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(setUserFromLocalStorage());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/tasks" /> : <LoginPage />}
        />

        <Route
          path="/tasks"
          element={
            isAuthenticated ? <TaskManagementPage /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/tasks" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
