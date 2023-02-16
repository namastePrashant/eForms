import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersAPI } from '../../services/users';

export const fetchUsers = createAsyncThunk('users/fetch', () => {
  const response = usersAPI.fetch();
  return response;
});

const initialState = {
  status: 'idle',
  data: [],
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    //
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = 'succeeded';

      state.data = action.payload;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const selectUsers = (state) => state.users.data;

export default usersSlice.reducer;
