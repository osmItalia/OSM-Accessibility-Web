import values from 'lodash/values';
import find from 'lodash/find';
import pick from 'lodash/pick';
import { createSelector } from '@reduxjs/toolkit';
import L from 'leaflet';

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

const getLayersWithFeatures = (layers, features) => {
  return layers.map(layer => {
    const ownedFeatures = features.filter(feat => feat.layer === layer.name);
    console.log(ownedFeatures);
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

export const layersSelector = createSelector(getDomain, getLayersList);

export const getLayersWithFeaturesSelector = createSelector(
  layersSelector,
  getVisible,
  getLayersWithFeatures
);

export const getLayerSelector = layer =>
  createSelector(getLayersWithFeaturesSelector, layers =>
    find(layers, l => l.name === layer)
  );
