import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: "responsive",
};

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState: initialState,
  reducers: {
    set(state, action) {
      state.sidebarShow = action.payload;
    },
  },
});

export const selectSidebarShow = (state) => state.sidebar.sidebarShow;

export const { set } = sideBarSlice.actions;

export default sideBarSlice.reducer;
