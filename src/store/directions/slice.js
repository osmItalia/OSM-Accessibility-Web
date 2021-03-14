import { createSlice } from '@reduxjs/toolkit';
import { TRAVEL_MEAN } from '../../constants';
import { cloneDeep } from 'lodash';

const initialState = {
  start: null,
  startInput: null,
  end: null,
  endInput: null,
  endOptions: [],
  startOptions: [],
  navigation: [],
  navigationKey: 1,
  navigationLoading: false,
  travelMean: TRAVEL_MEAN.CAR,
  selectFromMap: false,
  selectFromMapDestination: false
};

const directionsSlice = createSlice({
  name: 'directions',
  initialState,
  reducers: {
    set(state, action) {
      state[action.payload.key] = action.payload.value;
    },
    setStartInput(state, action) {
      if (action.payload) {
        state.startInput = action.payload;
        state.start = action.payload.split(',');
      } else {
        state.startInput = null;
        state.start = null;
      }
    },
    setEndInput(state, action) {
      if (action.payload) {
        state.endInput = action.payload;
        state.end = action.payload.split(',');
      } else {
        state.endInput = null;
        state.end = null;
      }
    },
    setEndOptions(state, action) {
      state.endOptions = action.payload;
    },
    setStartOptions(state, action) {
      state.startOptions = action.payload;
    },
    setStart(state, action) {
      state.start = action.payload;
      const stringified = action.payload.join(',');

      state.startOptions = [
        {
          key: stringified,
          label: `${action.payload[0].toFixed(4)},${action.payload[1].toFixed(
            4
          )}`,
          point: action.payload
        }
      ];
      state.startInput = stringified;
    },
    setEnd(state, action) {
      state.end = action.payload;
      const stringified = action.payload.join(',');

      state.endOptions = [
        {
          key: stringified,
          label: `${action.payload[0].toFixed(4)},${action.payload[1].toFixed(
            4
          )}`,
          point: action.payload
        }
      ];
      state.endInput = stringified;
    },
    onSearchStart(_state, _action) {},
    onSearchEnd(_state, _action) {},
    navigate(state) {
      state.navigationLoading = true;
    },
    endNavigation(state, action) {
      state.navigation = action.payload.features;
      state.navigationLoading = false;
    },
    forceUpdateNavigation(state) {
      state.navigationKey += 1;
    },
    invert(state) {
      const {
        start,
        end,
        endInput,
        startInput,
        startOptions,
        endOptions
      } = state;
      const oldStart = cloneDeep(start);
      const oldStartOptions = cloneDeep(startOptions);
      const oldStartInput = cloneDeep(startInput);

      const oldEnd = cloneDeep(end);
      const oldEndOptions = cloneDeep(endOptions);
      const oldEndInput = cloneDeep(endInput);

      state.start = oldEnd;
      state.startInput = oldEndInput;
      state.startOptions = oldEndOptions;

      state.end = oldStart;
      state.endInput = oldStartInput;
      state.endOptions = oldStartOptions;
    },
    setTravelMean(state, action) {
      state.travelMean = action.payload;
    },
    toggleSelectFromMap(state) {
      state.selectFromMap = !state.selectFromMap;
    },
    toggleSelectFromMapDestination(state) {
      state.selectFromMapDestination = !state.selectFromMapDestination;
    },
    selectPoint(_state, _action) {
      // this action will be intercepted by saga
    },
    selectDestinationPoint(_state, _action) {
      // this action will be intercepted by saga
    }
  }
});

export const directionsActions = directionsSlice.actions;
export default directionsSlice.reducer;
