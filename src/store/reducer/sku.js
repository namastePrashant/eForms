import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const skuSlice = createSlice({
  name: 'sku',
  initialState,
  reducers: {
    fetch: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const selectAllSkus = (state) => state.sku.data;

export const { fetch: getAllSkuSuccess } = skuSlice.actions;

export default skuSlice.reducer;
