import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import tasksReducer from "../slices/tasksSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "tasks"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
