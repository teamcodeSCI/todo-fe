import { createSlice } from '@reduxjs/toolkit';
import { createTopic, deleteTopic, getAllTopic, getTopicById } from './topicApi';
const initialState = {
  loaded: false,
  loading: false,
  topicList: [],
  currentTopic: null,
};
const topicSlice = createSlice({
  initialState,
  name: 'topic',
  extraReducers: (builder) =>
    builder
      .addCase(getAllTopic.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.topicList = action.payload.data;
      })
      .addCase(getAllTopic.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      })
      .addCase(createTopic.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.topicList.data.push(action.payload.data.data);
      })
      .addCase(createTopic.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      })
      .addCase(deleteTopic.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.topicList.data = state.topicList.data.filter((item) => item.id !== action.payload.data.data.id);
      })
      .addCase(deleteTopic.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      })
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
      }),
});
export default topicSlice;

export const topicSelector = (state) => state.topic.topicList;
export const currentTopicSelector = (state) => state.topic.currentTopic;
export const loadingTopicSelector = (state) => state.topic.loading;
export const loadedTopicSelector = (state) => state.topic.loaded;
