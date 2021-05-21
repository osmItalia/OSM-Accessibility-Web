import request from '../utils/request';

export class APIError extends Error {
  constructor(payload) {
    super('API error');
    this.payload = payload;
  }
}

export async function fetchLayer(layerName) {
  return request(`${window.LAYER_SOURCE}${layerName}.geojson`);
}

export async function fetchNominatim(query) {
  const url = new URL(window.NOMINATIM_URL);
  const params = {
    q: query,
    ...window.NOMINATIM_CONFIG
  };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  const response = await fetch(url);
  const body = await response.json();
  console.log(body);
  return body.features;
}

export async function fetchOpenRouteService(directionsState) {
  const { start, end, travelMean } = directionsState;
  const url = new URL(`${window.OPENROUTE_URL}${travelMean}`);
  const params = {
    api_key: window.OPENROUTE_KEY,
    start: `${start[1]},${start[0]}`,
    end: `${end[1]},${end[0]}`
  };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  const response = await fetch(url, {
    headers: {
      Accept: 'application/geo+json'
    }
  });
  const body = await response.json();
  if (response.status >= 400) {
    throw new APIError(body);
  }
  console.log(body);
  return body;
}

export async function saveNote(lat, lon, text) {
  const url = new URL(window.OSM_NOTE_API);
  const params = {
    lat,
    lon,
    text: `${window.NOTE_TAG} ${text}`
  };
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  const response = await fetch(url, { method: 'POST', headers });
  const body = await response.text();
  if (response.status >= 400) {
    throw new APIError(body);
  }
  const xmlResponse = new window.DOMParser().parseFromString(body, 'text/xml');
  console.log(xmlResponse);
  return xmlResponse;
}
