import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    dynamicDropdowns: []
  },
  reducers: {
    updateForm(state, action) {
      return action.payload;
    },
    clearForm(state, action) {
      return state;
    },
    storeDynamicDropDowns: (state, actions) => {
      state.dynamicDropdowns = {
        ...state.dynamicDropdowns,
        [actions.payload.url]: actions.payload.data
      }
    }
  },
});

export const selectForm = (state) => state.form;

export const { updateForm, clearForm, storeDynamicDropDowns } = formSlice.actions;

export default formSlice.reducer;
