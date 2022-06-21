import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import notificationReducer from './slices/notificationSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationReducer,
  },
});
