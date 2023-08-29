import http from '@/app/http';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const register = createAsyncThunk('auth/register', async (body) =>
  http.post(
    '/auth/register',
    JSON.stringify({
      first_name: body.firstName,
      last_name: body.lastName,
      position_id: Number(body.position),
      email: body.email,
      password: body.password,
      c_password: body.rePassword,
    }),
  ),
);
export const loginAPI = createAsyncThunk('auth/login', async (body) =>
  http.post('/auth/login', JSON.stringify({ email: body.email, password: body.password })),
);
export const getUserAPI = createAsyncThunk('auth/getUser', async (token) =>
  http.get('/auth/get-user', { headers: { Authorization: token } }),
);
export const resetPassword = createAsyncThunk('auth/resetPassword', async (body) =>
  http.post(
    '/auth/reset-password',
    JSON.stringify({ id: Number(body.id), password: body.new, c_password: body.retype }),
  ),
);
