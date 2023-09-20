import http from '@/app/http';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllUser = createAsyncThunk('userList/getAllUser', async () =>
  http.get(`/user-list`, { headers: { Authorization: localStorage.getItem('token') } }),
);
export const getUserByTopicId = createAsyncThunk('userList/getUserByTopicId', async (topicId) =>
  http.get(`/user-list?topic_id=${topicId}`, { headers: { Authorization: localStorage.getItem('token') } }),
);
export const addUser = createAsyncThunk('userList/addUser', async (body) =>
  http.post(`/user-list/create`, JSON.stringify({ topic_id: body.topicId, user_id: body.userId }), {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  }),
);
