import { createSlice } from '@reduxjs/toolkit';
import { getAllUser } from './userListApi';

const initialState = {
  loaded: false,
  loading: false,
  userSuggest: [],
};
const userSuggestSlice = createSlice({
  initialState,
  name: 'userSuggest',
  extraReducers: (builder) =>
    builder
      .addCase(getAllUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.userSuggest = action.payload.data.data;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      }),
});
export default userSuggestSlice;

export const userSuggestSelector = (state) => state.userSuggest.userSuggest;
export const loadingUserSuggestSelector = (state) => state.userSuggest.loading;
export const loadedUserSuggestSelector = (state) => state.userList.loaded;
