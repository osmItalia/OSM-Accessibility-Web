import values from 'lodash/values';
import find from 'lodash/find';
import { createSelector } from '@reduxjs/toolkit';
import L from 'leaflet';
import { getBounds } from '../map/selectors';

const getDomain = appState => appState.layers;

const getLayersList = layersState => values(layersState.layersById);

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

const getVisibleFeatures = (features, visibleBound) => {
  return features.filter(f => !f.bounds || visibleBound.contains(f.bounds));
};

const getLayersWithFeatures = (layers, features) => {
  return layers.map(layer => {
    const ownedFeatures = features.filter(feat => feat.layer === layer.name);
    return {
      ...layer,
      features: ownedFeatures.filter(f => f.geometry.type !== 'Point'),
      points: ownedFeatures.filter(f => f.geometry.type === 'Point')
    };
  });
};

export const featuresWithGeometrySelector = createSelector(
  getDomain,
  getFeaturesWithGeometry
);

export const visibleFeaturesSelector = createSelector(
  featuresWithGeometrySelector,
  getBounds,
  getVisibleFeatures
);

export const layersSelector = createSelector(getDomain, getLayersList);

export const getLayersWithFeaturesSelector = createSelector(
  layersSelector,
  visibleFeaturesSelector,
  getLayersWithFeatures
);

export const getLayerSelector = layer =>
  createSelector(getLayersWithFeaturesSelector, layers =>
    find(layers, l => l.name === layer)
  );
