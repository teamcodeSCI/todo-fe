import { fetchPosition } from './positionApi';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  loaded: false,
  positionList: [],
};
const positionSlice = createSlice({
  name: 'position',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosition.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPosition.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.positionList = action.payload;
      })
      .addCase(fetchPosition.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
        state.positionList = action.payload;
      });
  },
});
export default positionSlice;
export const loadingPositionSelector = (state) => state.position.loading;
export const loadedPositionSelector = (state) => state.position.loaded;
export const positionSelector = (state) => state.position.positionList;
