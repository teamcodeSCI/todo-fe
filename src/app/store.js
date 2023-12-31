import authSlice from '@/features/auth/authSlice';
import categoriesSlice from '@/features/category/categoriesSlice';
import positionSlice from '@/features/position/positionSlice';
import resetPassSlice from '@/features/resetPass/resetPassSlice';
import topicByIdSlice from '@/features/topic/topicByIdSlice';
import topicSlice from '@/features/topic/topicSlice';
import userListSlice from '@/features/userList/userListSlice';
import userSuggestSlice from '@/features/userList/userSuggestSlice';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  categories: categoriesSlice.reducer,
  position: positionSlice.reducer,
  auth: authSlice.reducer,
  resetPass: resetPassSlice.reducer,
  topic: topicSlice.reducer,
  topicById: topicByIdSlice.reducer,
  userList: userListSlice.reducer,
  userSuggest: userSuggestSlice.reducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
