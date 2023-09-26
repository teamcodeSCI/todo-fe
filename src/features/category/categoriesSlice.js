import { createSlice } from '@reduxjs/toolkit';
import { createCategories, deleteCategories, fetchCategories, updateCategories } from './categoriesApi';
import { createItem, deleteItem, updateItem, updatePosItem } from './itemApi';
const initialState = {
  loaded: false,
  loading: false,
  categoriesList: [],
};
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.categoriesList = action.payload.data.data;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      })
      .addCase(updateCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.categoriesList = state.categoriesList.map((item) =>
          item.id === action.payload.data.data.id ? action.payload.data.data : item,
        );
      })
      .addCase(updateCategories.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      })
      .addCase(createCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.categoriesList.push(action.payload.data.data);
      })
      .addCase(createCategories.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      })
      .addCase(deleteCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.categoriesList = state.categoriesList.filter((item) => item.id !== action.payload.data.data.id);
      })
      .addCase(deleteCategories.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      })
      .addCase(createItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.categoriesList
          .find((item) => item.id === action.payload.data.data.category_id)
          .items.push(action.payload.data.data);
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      })
      .addCase(updateItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.categoriesList.forEach((item) => {
          if (item.id === action.payload.data.data.category_id) {
            item.items = item.items.map((e) => (e.id === action.payload.data.data.id ? action.payload.data.data : e));
          }
        });
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      })
      .addCase(updatePosItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updatePosItem.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        if (!action.payload) return;
        const { source, destination } = action.payload;

        if (destination !== null) {
          const sourceColIdx = state.categoriesList.findIndex((e) => e.id === Number(source.droppableId));
          const destinationColIdx = state.categoriesList.findIndex((e) => e.id === Number(destination.droppableId));
          if (source.droppableId === destination.droppableId) {
            const sourceRowIdx = source.index;
            const destinationRowIdx = destination.index;
            const sourceCol = state.categoriesList[sourceColIdx];

            const sourceTasks = sourceCol.items[sourceRowIdx];
            const destinationTasks = sourceCol.items[destinationRowIdx];

            state.categoriesList[sourceColIdx].items[destinationRowIdx] = sourceTasks;
            state.categoriesList[sourceColIdx].items[sourceRowIdx] = destinationTasks;
          } else {
            const sourceCol = state.categoriesList[sourceColIdx];
            const destinationCol = state.categoriesList[destinationColIdx];

            const sourceTasks = [...sourceCol.items];
            const destinationTasks = [...destinationCol.items];

            const [removed] = sourceTasks.splice(source.index, 1);
            destinationTasks.splice(destination.index, 0, removed);

            state.categoriesList[sourceColIdx].items = sourceTasks;
            state.categoriesList[destinationColIdx].items = destinationTasks;
          }
        }
      })
      .addCase(updatePosItem.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      })
      .addCase(deleteItem.pending, (state, action) => {
        state.loading = true;
        state.loaded = false;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.categoriesList.forEach((item) => {
          if (item.id === action.payload.data.data.category_id) {
            item.items = item.items.filter((e) => e.id !== action.payload.data.data.id);
          }
        });
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
      }),
});
export default categoriesSlice;

export const categoriesListSelector = (state) => state.categories.categoriesList;
export const loadedCategoriesSelector = (state) => state.categories.loaded;
export const loadingCategoriesSelector = (state) => state.categories.loading;
