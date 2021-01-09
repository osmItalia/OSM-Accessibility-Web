import L from 'leaflet';
import './style.css';

import { ReactComponent as BarIcon } from './bar.svg';
import { ReactComponent as RestaurantIcon } from './restaurant.svg';
import { ReactComponent as ShopIcon } from './shop.svg';
import { ACCESSIBILITY_CLASSNAME } from '../constants';
import React from 'react';
import { renderToString } from 'react-dom/server';

const ICON_LAYERS = {
  bars: renderToString(<BarIcon />),
  restaurants: renderToString(<RestaurantIcon />),
  shops: renderToString(<ShopIcon />)
};

const createMarker = (layer, className) =>
  new L.DivIcon({
    html: ICON_LAYERS[layer],
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

['bars', 'restaurants', 'shops'].forEach(l => {
  ICON_LAYERS_WITH_CLASSNAMES[l] = createAccessibilityMarkers(l);
});

export function getIconForFeature(layer, wheelchair = 'unknown') {
  return ICON_LAYERS_WITH_CLASSNAMES[layer][wheelchair];
}
