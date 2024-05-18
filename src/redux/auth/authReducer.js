import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      user: payload,
    }),
    updateToken: (state, { payload }) => ({
      user: { ...state, access_token: payload.access_token },
    }),
    removeUser: () => initialState,
  },
});

export const { updateUserProfile, updateToken, removeUser } = authSlice.actions;

export default authSlice.reducer;
