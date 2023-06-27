import { createSlice } from "@reduxjs/toolkit";

const initialState = { detail: [], error: null };

export const DetailSlice = createSlice({
  name: " Detail",
  initialState,
  reducers: {
    DetailSuccess: (state, action) => {
      state.loading = false;
      state.detail = action.payload;
    },
    DetailFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default DetailSlice.reducer;

export const { DetailFail,DetailSuccess} = DetailSlice.actions;
