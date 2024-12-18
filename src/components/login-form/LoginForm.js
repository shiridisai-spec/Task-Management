import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, setUserFromLocalStorage } from "../../slices/authSlice";
import "../login-form/loginform.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    general: "",
  });

  const [loading, setLoading] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(setUserFromLocalStorage());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: "",
      general: "",
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);

      const registeredUsers =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];

      const user = registeredUsers.find(
        (user) =>
          user.username === formData.username &&
          user.password === formData.password
      );

      if (user) {
        dispatch(login({ username: formData.username }));
        setTimeout(() => {
          setLoading(false);
          navigate("/tasks");
        }, 1000);
      } else {
        setFormErrors({
          ...formErrors,
          general: "Invalid username or password",
        });
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-form-container">
      <h2 className="login-heading">Welcome Back! Please Log In</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={formErrors.username ? "input-error" : ""}
            placeholder="Enter your username"
          />
          {formErrors.username && (
            <p className="error-message">{formErrors.username}</p>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={formErrors.password ? "input-error" : ""}
            placeholder="Enter your password"
          />
          {formErrors.password && (
            <p className="error-message">{formErrors.password}</p>
          )}
        </div>
        {formErrors.general && (
          <p className="error-message">{formErrors.general}</p>
        )}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="login-link-text">
        Not yet signed up?
        <Link to="/register" className="login-link">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
