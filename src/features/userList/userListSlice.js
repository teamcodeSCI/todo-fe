import { createSlice } from '@reduxjs/toolkit';
import { getUserByTopicId } from './userListApi';

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
      }),
});
export default userListSlice;

export const userListSelector = (state) => state.userList.userList;
export const loadingUserListSelector = (state) => state.userList.loading;
export const loadedUserListSelector = (state) => state.userList.loaded;
