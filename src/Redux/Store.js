import { configureStore } from "@reduxjs/toolkit";

import HeaderReducer from "./HeaderSlice";
import DetailReducer from "./DetailSlice";
import ItemReducer from "./ItemSlice";

export const store = configureStore({
  reducer: {
    header: HeaderReducer,
    detail: DetailReducer,
    item: ItemReducer,
  },
});
