import http from '@/app/http';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (topicId) =>
    await http.get(`/category?topic_id=${topicId}`, { headers: { Authorization: localStorage.getItem('token') } }),
);
export const createCategories = createAsyncThunk(
  'categories/createCategories',
  async (newCategory) =>
    await http.post(`/category/create`, JSON.stringify({ topic_id: newCategory.topicId, name: newCategory.title }), {
      headers: { Authorization: localStorage.getItem('token') },
    }),
);
export const updateCategories = createAsyncThunk(
  'categories/updateCategories',
  async ({ category, category_id }) =>
    await http.put(`/category/${category_id}`, JSON.stringify({ name: category }), {
      headers: { Authorization: localStorage.getItem('token') },
    }),
);
export const deleteCategories = createAsyncThunk(
  'categories/deleteCategories',
  async ({ category_id }) =>
    await http.delete(`/category/${category_id}`, {
      headers: { Authorization: localStorage.getItem('token') },
    }),
);
