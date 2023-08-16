import { createSlice } from '@reduxjs/toolkit';
import { createCategories, fetchCategories, updateCategories } from './categoriesApi';
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
        state.categoriesList = action.payload;
      })
      .addCase(updateCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        const value = action.payload;
        if (!value) return;
        const { source, destination } = value;
        if (destination !== null) {
          const sourceColIdx = state.categoriesList.findIndex((e) => e.id === source.droppableId);
          const destinationColIdx = state.categoriesList.findIndex((e) => e.id === destination.droppableId);
          if (source.droppableId === destination.droppableId) {
            const sourceRowIdx = source.index;
            const destinationRowIdx = destination.index;
            const sourceCol = state.categoriesList[sourceColIdx];

            const sourceTasks = sourceCol.jobs[sourceRowIdx];
            const destinationTasks = sourceCol.jobs[destinationRowIdx];

            state.categoriesList[sourceColIdx].jobs[destinationRowIdx] = sourceTasks;
            state.categoriesList[sourceColIdx].jobs[sourceRowIdx] = destinationTasks;
          } else {
            const sourceCol = state.categoriesList[sourceColIdx];
            const destinationCol = state.categoriesList[destinationColIdx];

            const sourceTasks = [...sourceCol.jobs];
            const destinationTasks = [...destinationCol.jobs];

            const [removed] = sourceTasks.splice(source.index, 1);
            destinationTasks.splice(destination.index, 0, removed);

            state.categoriesList[sourceColIdx].jobs = sourceTasks;
            state.categoriesList[destinationColIdx].jobs = destinationTasks;
          }
        }
      })
      .addCase(createCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.categoriesList.push(action.payload);
      }),
});
export default categoriesSlice;

export const categoriesListSelector = (state) => state.categories.categoriesList;
export const loadedCategoriesSelector = (state) => state.categories.loaded;
