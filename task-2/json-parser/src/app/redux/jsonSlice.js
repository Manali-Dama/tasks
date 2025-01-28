import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inputJson: '',
  parsedJson: null,
  error: null,
};

const jsonSlice = createSlice({
  name: 'json',
  initialState,
  reducers: {
    setInputJson(state, action) {
      state.inputJson = action.payload;
    },
    parseJson(state) {
      try {
        state.parsedJson = JSON.parse(state.inputJson);
        state.error = null;
      } catch (err) {
        state.parsedJson = null;
        state.error = 'Invalid JSON format';
      }
    },
  },
});

export const { setInputJson, parseJson } = jsonSlice.actions;
export default jsonSlice.reducer;
