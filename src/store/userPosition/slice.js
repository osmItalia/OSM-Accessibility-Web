import { createSlice, createSelector } from '@reduxjs/toolkit';

const userPositionSlice = createSlice({
  name: 'userPosition',
  initialState: {
    enabled: false,
    position: null,
    geowatch: null
  },
  reducers: {
    enable(state) {
      state.enabled = true;
    },
    disable(state) {
      state.enabled = false;
    },
    setPosition(state, action) {
      state.position = action.payload;
    },
    setGeowatch(state, action) {
      state.geowatch = action.payload;
    }
  }
});

export const userPositionActions = userPositionSlice.actions;
export default userPositionSlice.reducer;

export const userPositionSelectors = {
  getState: createSelector(
    state => state.userPosition,
    state => state
  )
};
