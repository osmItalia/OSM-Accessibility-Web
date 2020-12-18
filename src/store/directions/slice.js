import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  start: null,
  startInput: '',
  loadingStart: false,
  end: null,
  endInput: '',
  loadingEnd: false,
  navigation: [],
  navigationKey: 1,
  navigationLoading: false
};

const directionsSlice = createSlice({
  name: 'directions',
  initialState,
  reducers: {
    set(state, action) {
      state[action.payload.key] = action.payload.value;
    },
    setStartInput(state, action) {
      state.startInput = action.payload;
    },
    setEndInput(state, action) {
      state.endInput = action.payload;
    },
    setStart(state, action) {
      state.start = action.payload;
      state.loadingStart = false;
    },
    setEnd(state, action) {
      state.end = action.payload;
      state.loadingEnd = false;
    },
    onSearchStart(state, _action) {
      state.loadingStart = true;
    },
    onSearchEnd(state, _action) {
      state.loadingEnd = true;
    },
    navigate(state) {
      state.navigationLoading = true;
    },
    endNavigation(state, action) {
      state.navigation = action.payload.features;
      state.navigationKey += 1;
      state.navigationLoading = false;
    }
  }
});

export const directionsActions = directionsSlice.actions;
export default directionsSlice.reducer;
