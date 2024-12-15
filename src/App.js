import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TaskManagementPage from "./pages/TaskManagementPage";
import { setUserFromLocalStorage } from "./slices/authSlice";
import "./App.css";
import RegistrationPage from "./pages/RegistrationPage";

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
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/tasks" /> : <RegistrationPage />
          }
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
