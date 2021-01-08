import { createSlice } from '@reduxjs/toolkit';
import pick from 'lodash/pick';
import pull from 'lodash/pull';

const layersSlice = createSlice({
  name: 'layers',
  initialState: {
    featuresById: {},
    loading: false,
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

      action.payload.data.features.forEach(feature => {
        state.featuresById[feature.id] = {
          ...pick(feature, 'id', 'properties', 'type'),
          layer: action.payload.name,
          visibleAfterScale: action.payload.visibleAfterScale
        };
        window.featureGeometries[feature.id] = feature.geometry;
      });
      state.visibleLayers.push(action.payload.name);
    },
    toggleLayer(state, action) {
      const has = state.visibleLayers.indexOf(action.payload) > -1;
      if (has) {
        pull(state.visibleLayers, action.payload);
      } else {
        state.visibleLayers.push(action.payload);
      }
    }
  }
});

export const layersActions = layersSlice.actions;
export default layersSlice.reducer;
