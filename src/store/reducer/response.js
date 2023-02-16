import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  totalPage: 1,
  currentPage: 1,
  total: 0,
  perPage: 0,


};

const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    fetch: (state, action) => {
      state.data = action.payload.data;
      state.currentPage = action.payload.current_page;
      state.totalPage = action.payload.last_page;
      state.total = action.payload.total;
      state.perPage = action.payload.per_page;
    },
    fetchResponseHtml: (state, action) => {
      state.responseHtml = action.payload
    }
  },
});

export const selectAllResponses = (state) => state.response.data;

export const { fetch: getAllResponses, fetchResponseHtml } = responseSlice.actions;

export default responseSlice.reducer;
