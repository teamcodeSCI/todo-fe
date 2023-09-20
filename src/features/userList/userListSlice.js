import { createSlice } from '@reduxjs/toolkit';
import { addUser, delUser, getUserByTopicId } from './userListApi';

const initialState = {
  loaded: false,
  loading: false,
  userList: [],
};
const userListSlice = createSlice({
  initialState,
  name: 'userList',
  extraReducers: (builder) =>
    builder
      .addCase(getUserByTopicId.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserByTopicId.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.userList = action.payload.data.data;
      })
      .addCase(getUserByTopicId.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      })
      .addCase(addUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.userList.push(action.payload.data.data);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      })
      .addCase(delUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(delUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.userList = state.userList.filter((item) => item.id !== action.payload.data.data.id);
      })
      .addCase(delUser.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      }),
});
export default userListSlice;

export const userListSelector = (state) => state.userList.userList;
export const loadingUserListSelector = (state) => state.userList.loading;
export const loadedUserListSelector = (state) => state.userList.loaded;
