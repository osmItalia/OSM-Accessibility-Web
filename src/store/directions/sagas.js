import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fetchNominatim, fetchOpenRouteService } from '../../api';
import { directionsActions } from './slice';
import { notification } from 'antd';
import { selectDirectionsState } from './selectors';

function* handleSearchChange(action) {
  if (action.payload && action.payload.length) {
    const results = yield call(fetchNominatim, action.payload);
    if (results.length === 0) {
      notification.error({ message: 'Non trovato' });
    } else {
      const point = [
        results[0].geometry.coordinates[1],
        results[0].geometry.coordinates[0]
      ];
      if (action.type === directionsActions.onSearchStart.type) {
        yield put(directionsActions.setStart(point));
        // yield put(
        //   directionsActions.setStartInput(results[0].properties.display_name)
        // );
      } else {
        yield put(directionsActions.setEnd(point));
        // yield put(
        //   directionsActions.setEndInput(results[0].properties.display_name)
        // );
      }
    }
  } else {
    const key =
      action.type === directionsActions.onSearchStart.type
        ? 'loadingStart'
        : 'loadingEnd';
    yield put(directionsActions.set({ key, value: false }));
  }
}

export function* fetchDirections() {
  const state = yield select(selectDirectionsState);
  console.log(state);
  try {
    const result = yield call(fetchOpenRouteService, state);
    /* TODO: intercept response and change viewport */
    yield put(directionsActions.endNavigation(result));
  } catch (e) {
    console.log(e);
    notification.error({ message: 'Errore' });
  }
}

export function* directionsSaga() {
  yield takeLatest(directionsActions.onSearchStart.type, handleSearchChange);
  yield takeLatest(directionsActions.onSearchEnd.type, handleSearchChange);
  yield takeLatest(directionsActions.navigate.type, fetchDirections);
}
