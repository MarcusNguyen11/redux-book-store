import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../app/apiService";

const initialState = {
  data: [],
  detail: null,
  loading: false,
  error: null,
  success: false,
};
export const addFavorites = createAsyncThunk(
  "favorites/addFavorites",
  async (removedBookId) => {
    const response = await apiService.get(`/favorites`);
    return response.data;
  }
);
export const removedFavorites = createAsyncThunk(
  "favorites/removedFavorites",
  async (removedBookId) => {
    const response = await apiService.delete(`/favorites/${removedBookId}`);
    const detailBook = {
      data: response.data,
      detailBookId: removedBookId,
    };
    return detailBook;
  }
);
export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addFavorites.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
    builder
      .addCase(removedFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(removedFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (book) => action.payload.detailBookId !== book.id
        );
        state.success = true;
      })
      .addCase(removedFavorites.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.success = false;
      });
  },
});

export default favoritesSlice.reducer;
