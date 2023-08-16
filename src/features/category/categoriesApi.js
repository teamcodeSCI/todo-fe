import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  return [
    { id: uuid(), title: 'To do', jobs: [{ id: uuid(), title: 'test' }] },
    { id: uuid(), title: 'In Progress', jobs: [{ id: uuid(), title: 'test' }] },
    { id: uuid(), title: 'Completed', jobs: [{ id: uuid(), title: 'test' }] },
    { id: uuid(), title: 'Verify', jobs: [{ id: uuid(), title: 'test' }] },
  ];
});
export const createCategories = createAsyncThunk('categories/createCategories', async (newCategory) => {
  return newCategory;
});
export const updateCategories = createAsyncThunk('categories/updateCategories', async (value) => {
  return value;
});
