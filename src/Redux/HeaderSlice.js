import { createSlice } from "@reduxjs/toolkit";

const initialState = {  header: [], error: null };

export const HeaderSlice = createSlice({
  name: " Header",
  initialState,
  reducers: {
    HeaderSuccess: (state, action) => {
      state.loading = false;
      state.header = action.payload;
    },
    HeaderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default HeaderSlice.reducer;

export const { HeaderFail, HeaderSuccess } = HeaderSlice.actions;
