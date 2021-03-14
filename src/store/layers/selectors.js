import values from 'lodash/values';
import pick from 'lodash/pick';
import { createSelector } from '@reduxjs/toolkit';
import L from 'leaflet';

const getDomain = appState => appState.layers;

const getFeaturesWithGeometry = layersState => {
  const features = values(layersState.featuresById);

  return features.map(f => {
    const geom = window.featureGeometries[f.id];
    let bounds;

    if (geom.type === 'Point') {
      bounds = L.latLng(geom.coordinates[1], geom.coordinates[0]);
    } else {
      /* TODO: compute LatLngBounds of different geometry types */
      bounds = null;
    }

    return {
      ...f,
      geometry: geom,
      bounds
    };
  });
};

const getOnlyVisibleFeatures = layersState => {
  const features = values(
    pick(layersState.featuresById, ...layersState.visibleFeatures)
  );
  return features.map(f => ({
    geometry: window.featureGeometries[f.id],
    ...f
  }));
};

const getVisible = createSelector(getDomain, getOnlyVisibleFeatures);

const getFeatures = features => {
  return {
    features: features.filter(f => f.geometry.type !== 'Point'),
    points: features.filter(f => f.geometry.type === 'Point')
  };
};

export const featuresWithGeometrySelector = createSelector(
  getDomain,
  getFeaturesWithGeometry
);

export const getFeaturesSelector = createSelector(getVisible, getFeatures);

export const getLayers = createSelector(
  getDomain,
  layers => layers.visibleLayers
);

export const getFeaturesGroupedByLayer = createSelector(
  getFeaturesSelector,
  getDomain,
  ({ points }, { visibleLayers }) => {
    const layers = visibleLayers.reduce((p, c) => ({ ...p, [c]: [] }), {});

    points.forEach(point => {
      const array = layers[point.layer];
      if (array && Array.isArray(array)) {
        layers[point.layer].push(point);
      }
    });

    return layers;
  }
);

export const getShowAll = createSelector(getDomain, layers => layers.showAll);
