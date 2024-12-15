import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
    },

    setUserFromLocalStorage(state) {
      const user = localStorage.getItem("user");
      if (user) {
        state.isAuthenticated = true;
        state.user = JSON.parse(user);
      }
    },

    registerUser(state, action) {
      // Add new user to the registered users array in localStorage
      let registeredUsers =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];
      registeredUsers.push(action.payload);
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    },
  },
});

export const { login, logout, setUserFromLocalStorage, registerUser } =
  authSlice.actions;
export default authSlice.reducer;
