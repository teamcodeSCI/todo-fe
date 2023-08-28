const { default: http } = require('@/app/http');
const { createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchPosition = createAsyncThunk('position/fetchPosition', async () => http.get('/position'));
