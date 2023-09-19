import { createSlice } from '@reduxjs/toolkit';
import { createTopic, deleteTopic, getAllTopic, updateTopic } from './topicApi';
const initialState = {
  loaded: false,
  loading: false,
  topicList: [],
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
        state.topicList.data = state.topicList.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
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
      .addCase(updateTopic.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;

        state.topicList.data = state.topicList.data.map((item) =>
          item.id === action.payload.data.data.id ? action.payload.data.data : item,
        );
      })
      .addCase(updateTopic.rejected, (state, action) => {
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
      }),
});
export default topicSlice;

export const topicSelector = (state) => state.topic.topicList;
export const loadingTopicSelector = (state) => state.topic.loading;
export const loadedTopicSelector = (state) => state.topic.loaded;
