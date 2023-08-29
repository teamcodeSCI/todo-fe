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
