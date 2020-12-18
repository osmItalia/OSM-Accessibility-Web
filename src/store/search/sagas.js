import { takeLatest, put, call } from 'redux-saga/effects';
import { featureCollection, envelope, bbox } from '@turf/turf';
import { searchActions } from './reducer';
import { bboxAsBounds } from '../../utils/geo';
import { fetchNominatim } from '../../api';

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
