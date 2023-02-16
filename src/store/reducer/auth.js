import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../services/auth';

export const postAuth = createAsyncThunk(
  'auth/post',
  async (payload, thunkApi) => {
    try {
      const response = await authAPI.post(payload, thunkApi);
      return response;
    } catch (error) {
      thunkApi.rejectWithValue(error?.response);
    }
  }
);

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') ?? false,
  data: JSON.parse(localStorage.getItem('userData') ?? null),
  auth: JSON.parse(localStorage.getItem('auth') ?? null),
  errors: [],
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.data = action.payload;
      state.isAuthenticated = true;
      state.auth = action.authCred;
    },
    storeAuthCred: (state, action) => {
      state.auth = action.payload;
    },
    logout: (state, action) => {
      state.data = null;
      state.auth = null;
      state.isAuthenticated = false;
      localStorage.removeItem('userData');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('auth');
    },
  },
  extraReducers: {
    [postAuth.pending]: (state, action) => {
      state.status = 'loading';
    },
    [postAuth.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isAuthenticated = true;
    },
    [postAuth.rejected]: (state, action) => {
      state.status = 'failed';
      state.errors.push(action.payload);
    },
  },
});

export const selectErrors = (state) => state.auth.errors;
export const selectAuthStatus = (state) => state.auth.isAuthenticated;
export const data = (state) => state.auth.data;
export const authCred = (state) => state.auth.auth;
export const { logout, loginSuccess, auth, storeAuthCred } = authSlice.actions;

export default authSlice.reducer;
