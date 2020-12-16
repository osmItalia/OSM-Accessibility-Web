import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  zoom: 14,
  // TODO: initialize later
  NEBound: [9.233407974243166, 45.485470029442745],
  SWBound: [9.109811782836916, 45.439477533160776]
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setZoom(state, action) {
      state.zoom = action.payload;
    },
    setBounds(state, action) {
      const NE = action.payload.getNorthEast();
      const SW = action.payload.getSouthWest();
      state.NEBound = [NE.lat, NE.lng];
      state.SWBound = [SW.lat, SW.lng];
    }
  }
});

export const mapActions = mapSlice.actions;
export default mapSlice.reducer;
