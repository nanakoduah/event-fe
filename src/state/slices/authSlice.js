import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userLoggedIn: false,
  token: '',
  user: {
    email: '',
    name: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      return (state = {
        ...action.payload,
        userLoggedIn: true,
      });
    },
    signout: () => {
      return (state = {
        ...initialState,
      });
    },
  },
});

export const { setAuth, signout } = authSlice.actions;

export default authSlice.reducer;
