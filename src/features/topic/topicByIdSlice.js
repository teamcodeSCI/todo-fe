import { createSlice } from '@reduxjs/toolkit';
import { getTopicById } from './topicApi';
const initialState = {
  loaded: false,
  loading: false,
  currentTopic: null,
};

const topicByIdSlice = createSlice({
  name: 'topicById',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTopicById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTopicById.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.currentTopic = action.payload.data.data;
      })
      .addCase(getTopicById.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      });
  },
});
export default topicByIdSlice;

export const currentTopicSelector = (state) => state.topicById.currentTopic;
export const currentTopicLoadingSelector = (state) => state.topicById.loading;
export const currentTopicLoadedSelector = (state) => state.topicById.loaded;
