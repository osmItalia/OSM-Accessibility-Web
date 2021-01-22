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

export const NEWSLETTER_IFRAME_SRC =
  'https://www.webarea.services/form_give/index.php?pagina=form&action=viewForm&idform=474&idEnass=c8ffe9a587b126f152ed3d89a146b445';

export const PAYPAL_DONATION_URL =
  'https://www.paypal.com/donate/?business=ECAW27MH2UEPU&item_name=test&currency_code=EUR';
