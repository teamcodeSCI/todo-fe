import authSlice from '@/features/auth/authSlice';
import categoriesSlice from '@/features/category/categoriesSlice';
import positionSlice from '@/features/position/positionSlice';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  categories: categoriesSlice.reducer,
  position: positionSlice.reducer,
  auth: authSlice.reducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
