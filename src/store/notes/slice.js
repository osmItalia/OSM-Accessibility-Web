import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  position: null,
  selectFromMap: false
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setPosition(state, action) {
      state.position = action.payload;
    },
    close(state) {
      state.position = null;
      state.selectFromMap = false;
    },
    toggleSelectFromMap(state) {
      state.selectFromMap = !state.selectFromMap;
    },
    sendNote(_state, _action) {
      // this action will be intercepted by saga
    }
  }
});

export const noteActions = noteSlice.actions;
export default noteSlice.reducer;
