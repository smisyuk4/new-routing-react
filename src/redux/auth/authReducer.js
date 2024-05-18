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
    removeUser: () => initialState,
  },
});

export const { updateUserProfile, removeUser } = authSlice.actions;

export default authSlice.reducer;
