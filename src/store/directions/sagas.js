import { takeLatest, put, call, select } from 'redux-saga/effects';
import { APIError, fetchNominatim, fetchOpenRouteService } from '../../api';
import { directionsActions } from './slice';
import { notification } from 'antd';
import {
  selectDirectionInputEnd,
  selectDirectionInputStart,
  selectDirectionsState
} from './selectors';

function* handleSearchChange(action) {
  let value;
  const startVal = yield select(selectDirectionInputStart);
  const endVal = yield select(selectDirectionInputEnd);
  if (action.type === directionsActions.onSearchStart.type) {
    value = startVal;
  } else {
    value = endVal;
  }
  if (value && value.length) {
    const results = yield call(fetchNominatim, value);
    if (results.length === 0) {
      notification.error({ message: 'Non trovato' });
    } else {
      const point = [
        results[0].geometry.coordinates[1],
        results[0].geometry.coordinates[0]
      ];
      const addr = results[0].properties.address;
      const address = [addr.amenity, [addr.road, addr.house_number].join(' ')]
        .filter(_ => _)
        .join(', ');
      if (action.type === directionsActions.onSearchStart.type) {
        yield put(directionsActions.setStart(point));
        yield put(directionsActions.set({ key: 'startInput', value: address }));
        if (endVal) {
          yield put(directionsActions.navigate());
        }
      } else {
        yield put(directionsActions.setEnd(point));
        yield put(directionsActions.set({ key: 'endInput', value: address }));
        if (startVal) {
          yield put(directionsActions.navigate());
        }
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

export function* handleChangeMean() {
  const state = yield select(selectDirectionsState);
  if (state.start && state.end) {
    yield put(directionsActions.navigate());
  }
}

export function* fetchDirections() {
  const state = yield select(selectDirectionsState);
  console.log(state);
  try {
    const result = yield call(fetchOpenRouteService, state);
    /* TODO: intercept response and change viewport */
    yield put(directionsActions.endNavigation(result));
    yield put(directionsActions.forceUpdateNavigation());
  } catch (e) {
    console.log(e);
    if (e instanceof APIError) {
      notification.error({ message: e.payload.error.message });
    } else {
      notification.error({ message: 'Errore' });
    }
  }
}

export function* directionsSaga() {
  yield takeLatest(directionsActions.onSearchStart.type, handleSearchChange);
  yield takeLatest(directionsActions.onSearchEnd.type, handleSearchChange);
  yield takeLatest(directionsActions.navigate.type, fetchDirections);
  yield takeLatest(directionsActions.setTravelMean.type, handleChangeMean);
}
