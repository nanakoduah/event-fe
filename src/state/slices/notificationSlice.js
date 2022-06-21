import { createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';

const initialState = [];

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.push({ ...action.payload, id: uniqueId() });
      return state;
    },
    unSetNotification: (state, action) => {
      state = state.filter((stateItem) => stateItem.id !== action.payload.id);
      return state;
    },
  },
});

export const { unSetNotification, setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
