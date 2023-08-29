import http from '@/app/http';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosition = createAsyncThunk('position/fetchPosition', async () => http.get('/position'));
