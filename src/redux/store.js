import { configureStore } from '@reduxjs/toolkit';

// import rootReducer from './rootReducer'; 
import authReducer from "./slices/authSlice"

const store = configureStore({
  // reducer: rootReducer,
  reducer: {
    auth: authReducer, 
  },
});

export default store;