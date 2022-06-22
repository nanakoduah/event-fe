import { combineReducers } from 'redux';
import authReducer from './authSlice';
import notificationReducer from './notificationSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationReducer,
});

export default rootReducer;
