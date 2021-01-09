import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  zoom: 16,
  bounds: null
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setZoom(state, action) {
      state.zoom = action.payload;
    },
    setBounds(state, action) {
      state.bounds = action.payload;
    },
    click() {
      //  pass
    }
  }
});

export const mapActions = mapSlice.actions;
export default mapSlice.reducer;
