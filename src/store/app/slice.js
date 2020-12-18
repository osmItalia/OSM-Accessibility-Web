import { createSlice } from '@reduxjs/toolkit';
import { MODES } from '../../constants';

const initialState = {
  mode: MODES.SEARCH,
  sider: true
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showSider(state) {
      state.sider = true;
    },
    hideSider(state) {
      state.sider = false;
    },
    toggleSider(state) {
      state.sider = !state.sider;
    },
    openDirections(state) {
      state.mode = MODES.DIRECTIONS;
    },
    openSearch(state) {
      state.mode = MODES.SEARCH;
    }
  }
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
