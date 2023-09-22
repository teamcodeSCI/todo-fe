import http from '@/app/http';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllTopic = createAsyncThunk(
  'topic/getAllTopic',
  async () => await http.get('/topic', { headers: { Authorization: localStorage.getItem('token') } }),
);
export const getTopicById = createAsyncThunk(
  'topic/getTopicById',
  async (id) => await http.get(`/topic/${id}`, { headers: { Authorization: localStorage.getItem('token') } }),
);
export const createTopic = createAsyncThunk(
  'topic/createTopic',
  async (body) =>
    await http.post('/topic/create', JSON.stringify(body), {
      headers: { Authorization: localStorage.getItem('token') },
    }),
);
export const updateTopic = createAsyncThunk(
  'topic/updateTopic',
  async ({ id, name }) =>
    await http.put(`/topic/${id}`, JSON.stringify({ name: name }), {
      headers: { Authorization: localStorage.getItem('token') },
    }),
);
export const deleteTopic = createAsyncThunk(
  'topic/deleteTopic',
  async (id) =>
    await http.delete(`/topic/${id}`, {
      headers: { Authorization: localStorage.getItem('token') },
    }),
);
