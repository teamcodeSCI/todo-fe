import http from '@/app/http';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllTopic = createAsyncThunk('topic/getAllTopic', async () =>
  http.get('/topic', { headers: { Authorization: localStorage.getItem('token') } }),
);
export const getTopicById = createAsyncThunk('topic/getTopicById', async (id) =>
  http.get(`/topic/${id}`, { headers: { Authorization: localStorage.getItem('token') } }),
);
export const createTopic = createAsyncThunk('topic/createTopic', async (body) =>
  http.post('/topic/create', JSON.stringify(body), {
    headers: { Authorization: localStorage.getItem('token') },
  }),
);
export const deleteTopic = createAsyncThunk('topic/deleteTopic', async (id) =>
  http.delete(`/topic/${id}`, {
    headers: { Authorization: localStorage.getItem('token') },
  }),
);
