import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  zoom: 14
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setZoom(state, action) {
      state.zoom = action.payload;
    },
    setBounds(_state, _action) {
      // this action will be caught by saga
    }
  }
});

export const mapActions = mapSlice.actions;
export default mapSlice.reducer;
