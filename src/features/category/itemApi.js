import http from '@/app/http';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createItem = createAsyncThunk(
  'item/createItem',
  async (item) =>
    await http.post('/item/create', JSON.stringify({ category_id: item.categoryId, title: item.title }), {
      headers: { Authorization: localStorage.getItem('token') },
    }),
);
export const updatePosItem = createAsyncThunk('item/updatePosItem', async (value) => {
  if (value.destination) {
    await http.put(
      `/item/${value.draggableId}`,
      JSON.stringify({ category_id: value.destination.droppableId, index: value.destination.index }),
      {
        headers: { Authorization: localStorage.getItem('token') },
      },
    );
    return value;
  }
});
export const updateItem = createAsyncThunk(
  'item/updateItem',
  async (body) =>
    await http.put(`/item/${body.id}`, JSON.stringify({ title: body.title, content: body.content }), {
      headers: { Authorization: localStorage.getItem('token') },
    }),
);
export const deleteItem = createAsyncThunk(
  'item/deleteItem',
  async (id) =>
    await http.delete(`/item/${id}`, {
      headers: { Authorization: localStorage.getItem('token') },
    }),
);
