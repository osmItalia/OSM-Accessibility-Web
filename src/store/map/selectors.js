import L from 'leaflet';

export const getZoom = appState => appState.map.zoom;

export const getBounds = appState => {
  console.log(appState);
  const ne = L.latLng(appState.map.NEBound[0], appState.map.NEBound[1]);
  const sw = L.latLng(appState.map.SWBound[0], appState.map.SWBound[1]);

  return L.latLngBounds(ne, sw);
};
