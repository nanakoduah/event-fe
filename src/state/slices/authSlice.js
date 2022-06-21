import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  userLoggedIn: false,
  token: '',
  name: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      console.log({ state, action });
      return (state = {
        ...action.payload,
      });
    },
    signout: () => {
      return state;
    },
  },
});

export const { setAuth, signout } = authSlice.actions;

export default authSlice.reducer;
