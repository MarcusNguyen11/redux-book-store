import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  detail: null,
  loading: false,
  error: null,
  detailError: null,
};

export const getBooks = createAsyncThunk(
  "counter/getBooks",
  async ({ pageNum, limit, query }) => {
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) url += `&q=${query}`;
    const response = await apiService.get(url);
    return response.data;
  }
);
export const postData = createAsyncThunk(
  "counter/postData",
  async (addingBook) => {
    if (!addingBook) return;
    await apiService.post(`/favorites`, addingBook);
    toast.success("The book has been added to the reading list!");
  }
);

export const fetchData = createAsyncThunk(
  "counter/fetchData",
  async (bookId) => {
    const response = await apiService.get(`/books/${bookId}`);
    return response.data;
  }
);

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
    builder
      .addCase(postData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.loading = false;
        state.detailError = null;
        console.log(state.error);
      })
      .addCase(postData.rejected, (state, action) => {
        state.detailError = action.error.message;
        state.loading = false;
        console.log(state.error)
      });
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default bookSlice.reducer;
