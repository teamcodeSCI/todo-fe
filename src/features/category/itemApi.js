import http from '@/app/http';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createItem = createAsyncThunk('item/createItem', async (item) =>
  http.post('/item/create', JSON.stringify({ category_id: item.categoryId, content: item.title }), {
    headers: { Authorization: localStorage.getItem('token') },
  }),
);
export const updatePosItem = createAsyncThunk('item/updatePosItem', async (value) => {
  http.put(
    `/item/${value.draggableId}`,
    JSON.stringify({ category_id: value.destination.droppableId, index: value.destination.index }),
    {
      headers: { Authorization: localStorage.getItem('token') },
    },
  );
  return value;
});
