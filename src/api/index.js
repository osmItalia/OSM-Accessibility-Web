import request from '../utils/request';

export async function fetchLayer(layerName) {
  return request(`/static/data/${layerName}.geojson`);
}
