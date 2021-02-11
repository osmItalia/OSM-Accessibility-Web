import L from 'leaflet';
import './style.css';

import { ACCESSIBILITY_CLASSNAME, LAYERS } from '../constants';
import React from 'react';
import { renderToString } from 'react-dom/server';

const createMarker = (layer, className) =>
  new L.DivIcon({
    html: renderToString(<layer.marker />),
    className: `layer-icon ${className}`,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50]
  });

function createAccessibilityMarkers(layer) {
  const markers = {};
  Object.keys(ACCESSIBILITY_CLASSNAME).forEach(cn => {
    markers[cn] = createMarker(layer, ACCESSIBILITY_CLASSNAME[cn]);
  });
  return markers;
}

const ICON_LAYERS_WITH_CLASSNAMES = {};

LAYERS.forEach(l => {
  ICON_LAYERS_WITH_CLASSNAMES[l.name] = createAccessibilityMarkers(l);
});

export function getIconForFeature(layer, wheelchair = 'unknown') {
  return ICON_LAYERS_WITH_CLASSNAMES[layer][wheelchair];
}
