import { createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';

const initialState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notifications.push({ ...action.payload, id: uniqueId() });
      return state;
    },
    unSetNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (stateItem) => stateItem.id !== action.payload.id
      );
      return state;
    },
  },
});

export const { unSetNotification, setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
