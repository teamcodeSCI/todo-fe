import { register } from './authApi';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  loaded: false,
  currentUser: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.currentUser = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
        state.currentUser = action.payload;
      });
  },
});
export default authSlice;
export const loadingAuthSelector = (state) => state.auth.loading;
export const loadedAuthSelector = (state) => state.auth.loaded;
export const currentUserSelector = (state) => state.auth.currentUser;
