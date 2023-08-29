import { createSlice } from '@reduxjs/toolkit';
import { resetPassword } from './resetPassAPI';
const initialState = {
  loading: false,
};
const resetPassSlice = createSlice({
  name: 'resetPass',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.clear();
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default resetPassSlice;
export const loadedResetPassSelector = (state) => state.resetPass.loaded;
export const loadingResetPassSelector = (state) => state.resetPass.loading;
