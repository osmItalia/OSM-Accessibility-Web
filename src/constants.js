import L from 'leaflet';

export const customMarker = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});

export const ACCESSIBILITY_CLASSNAME = {
  yes: 'accessibility_yes',
  no: 'accessibility_no',
  limited: 'accessibility_limited',
  unknown: 'accessibility_unknown'
};

export const MODES = {
  SEARCH: 'search',
  DIRECTIONS: 'directions'
};

export const TRAVEL_MEAN = {
  CAR: 'driving-car',
  FOOT: 'foot-walking',
  WHEELCHAIR: 'wheelchair'
};
