import { createSlice } from '@reduxjs/toolkit';
import pick from 'lodash/pick';

const layersSlice = createSlice({
  name: 'layers',
  initialState: {
    featuresById: {},
    loading: false,
    layersById: {}
  },
  reducers: {
    fetch(state) {
      state.loading = true;
    },
    fetchEnd(state, action) {
      state.loading = false;
      window.featureGeometries = window.featureGeometries || {};

      state.layersById[action.payload.name] = {
        name: action.payload.name,
        visible: true
      };

      action.payload.data.features.forEach(feature => {
        state.featuresById[feature.id] = {
          ...pick(feature, 'id', 'properties', 'type'),
          layer: action.payload.name
        };
        window.featureGeometries[feature.id] = feature.geometry;
      });
    }
  }
});

export const layersActions = layersSlice.actions;
export default layersSlice.reducer;
