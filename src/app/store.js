import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookSliceReducer from "../service/slice";
import favoritesSlice from "../service/favoritesSlice";

export const store = configureStore({
  reducer: combineReducers({
    books: bookSliceReducer,
    favorites: favoritesSlice,
  }),
});

export default store;
