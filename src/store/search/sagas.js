import { takeLatest, put, call } from 'redux-saga/effects';
import { featureCollection, envelope, bbox } from '@turf/turf';
import { searchActions } from './reducer';
import { bboxAsBounds } from '../../utils/geo';

async function fetchNominatim(query) {
  const url = new URL(`https://nominatim.openstreetmap.org/search/${query}`);
  const params = {
    format: 'geojson',
    addressdetails: 1,
    extratags: 1,
    countrycodes: 'it',
    viewbox: '9.06481,45.382812,9.302908,45.5425',
    bounded: 1
  };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  const response = await fetch(url);
  const body = await response.json();
  console.log(body);
  return body.features;
}

function setBoundingBox(results) {
  if (results.length > 0) {
    const collection = featureCollection(results);
    const env = envelope(collection);
    const boundingBox = bbox(env);
    window.LEAFLET_MAP.fitBounds(bboxAsBounds(boundingBox));
  }
}

function* handleSearchChange(action) {
  if (action.payload && action.payload.length) {
    yield put(searchActions.setLoading(true));
    const results = yield call(fetchNominatim, action.payload);
    yield call(setBoundingBox, results);
    yield put(searchActions.setSearchList(results));
    yield put(searchActions.setLoading(false));
  } else {
    yield put(searchActions.cleanSearch());
  }
}

export function* watchSearchChanges() {
  yield takeLatest(searchActions.changeInput.type, handleSearchChange);
}
