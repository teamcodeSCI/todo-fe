import http from '@/app/http';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const resetPassword = createAsyncThunk('auth/resetPassword', async (body) =>
  http.post(
    '/auth/reset-password',
    JSON.stringify({ id: Number(body.id), password: body.new, c_password: body.retype }),
  ),
);
