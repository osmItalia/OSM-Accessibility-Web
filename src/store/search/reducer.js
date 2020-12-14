import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    input: '',
    list: [],
    loading: false
  },
  reducers: {
    changeInput(state, action) {
      state.input = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSearchList(state, action) {
      state.list = action.payload;
    },
    cleanSearch(state) {
      state.list = [];
    }
  }
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
