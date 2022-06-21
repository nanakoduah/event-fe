import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userLoggedIn: false,
  token: '',
  user: {
    email: '',
    name: '',
    subscriptions: [],
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
    setUserSubscriptions: (state, action) => {
      return (state = {
        ...state,
        user: action.payload,
      });
    },
    signout: (state) => {
      return (state = {
        ...initialState,
      });
    },
  },
});

export const { setAuth, signout, setUserSubscriptions } = authSlice.actions;

export default authSlice.reducer;
