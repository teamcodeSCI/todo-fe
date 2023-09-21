import { createSlice } from '@reduxjs/toolkit';
import { createCategories, createItem, deleteCategories, fetchCategories, updateCategories } from './categoriesApi';
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
      .addCase(updateCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.categoriesList = state.categoriesList.map((item) =>
          item.id === action.payload.data.data.id ? action.payload.data.data : item,
        );
        // if (!action.payload) return;
        // const { source, destination } = action.payload;
        // if (destination !== null) {
        //   const sourceColIdx = state.categoriesList.findIndex((e) => e.id === source.droppableId);
        //   const destinationColIdx = state.categoriesList.findIndex((e) => e.id === destination.droppableId);
        //   if (source.droppableId === destination.droppableId) {
        //     const sourceRowIdx = source.index;
        //     const destinationRowIdx = destination.index;
        //     const sourceCol = state.categoriesList[sourceColIdx];

        //     const sourceTasks = sourceCol.jobs[sourceRowIdx];
        //     const destinationTasks = sourceCol.jobs[destinationRowIdx];

        //     state.categoriesList[sourceColIdx].jobs[destinationRowIdx] = sourceTasks;
        //     state.categoriesList[sourceColIdx].jobs[sourceRowIdx] = destinationTasks;
        //   } else {
        //     const sourceCol = state.categoriesList[sourceColIdx];
        //     const destinationCol = state.categoriesList[destinationColIdx];

        //     const sourceTasks = [...sourceCol.jobs];
        //     const destinationTasks = [...destinationCol.jobs];

        //     const [removed] = sourceTasks.splice(source.index, 1);
        //     destinationTasks.splice(destination.index, 0, removed);

        //     state.categoriesList[sourceColIdx].jobs = sourceTasks;
        //     state.categoriesList[destinationColIdx].jobs = destinationTasks;
        //   }
        // }
      })
      .addCase(createCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.categoriesList.push(action.payload.data.data);
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
        console.log(action.payload);
        state.categoriesList.find((item) => item.id === action.payload.category_id).jobs.push(action.payload);
      }),
});
export default categoriesSlice;

export const categoriesListSelector = (state) => state.categories.categoriesList;
export const loadedCategoriesSelector = (state) => state.categories.loaded;
export const loadingCategoriesSelector = (state) => state.categories.loading;
