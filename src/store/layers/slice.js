import { createSlice } from '@reduxjs/toolkit';
import pick from 'lodash/pick';

const layersSlice = createSlice({
  name: 'layers',
  initialState: {
    featuresById: {},
    loading: false,
    layersById: {},
    visibleLayers: [],
    visibleFeatures: []
  },
  reducers: {
    fetch(state) {
      state.loading = true;
    },
    setVisibleFeatures(state, action) {
      state.visibleFeatures = action.payload;
    },
    fetchEnd(state, action) {
      state.loading = false;
      window.featureGeometries = window.featureGeometries || {};

      state.layersById[action.payload.name] = {
        name: action.payload.name,
        visible: true,
        visibleAfterScale: action.payload.visibleAfterScale
      };

      action.payload.data.features.forEach(feature => {
        state.featuresById[feature.id] = {
          ...pick(feature, 'id', 'properties', 'type'),
          layer: action.payload.name,
          visibleAfterScale: action.payload.visibleAfterScale
        };
        window.featureGeometries[feature.id] = feature.geometry;
      });
      state.visibleLayers.push(action.payload.name);
    }
  }
});

export const layersActions = layersSlice.actions;
export default layersSlice.reducer;
