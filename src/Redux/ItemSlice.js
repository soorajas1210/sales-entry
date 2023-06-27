import { createSlice } from "@reduxjs/toolkit";

const initialState = { item: [], error: null };

export const ItemSlice = createSlice({
  name: " item",
  initialState,
  reducers: {
    ItemSuccess: (state, action) => {
      state.loading = false;
      state.item = action.payload;
    },
    ItemFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default ItemSlice.reducer;

export const {ItemFail,ItemSuccess } = ItemSlice.actions;
