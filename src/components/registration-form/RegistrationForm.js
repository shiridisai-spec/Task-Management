import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../slices/authSlice";
import "../../components/login-form/loginform.css";

const RegistrationForm = () => {
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

  const registeredUsers =
    JSON.parse(localStorage.getItem("registeredUsers")) || [];

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
    } else if (
      registeredUsers.some((user) => user.username === formData.username)
    ) {
      errors.username = "Username already exists";
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

      dispatch(
        registerUser({
          username: formData.username,
          password: formData.password,
        })
      );

      setTimeout(() => {
        setLoading(false);
        navigate("/tasks");
      }, 1000);
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-heading">Create a New Account</h2>
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="login-link-text">
        Already have an account?{" "}
        <Link to="/login" className="login-link">
          Log in here
        </Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
