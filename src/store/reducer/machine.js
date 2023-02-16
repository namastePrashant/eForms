import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const machineSlice = createSlice({
  name: 'machine',
  initialState,
  reducers: {
    fetch: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const selectAllMachines = (state) => state.machine.data;

export const { fetch: getAllMachineSuccess } = machineSlice.actions;

export default machineSlice.reducer;
