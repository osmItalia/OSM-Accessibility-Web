import { takeLatest, put, call, select, debounce } from 'redux-saga/effects';
import { APIError, fetchNominatim, fetchOpenRouteService } from '../../api';
import { directionsActions } from './slice';
import { notification } from 'antd';
import {
  // selectDirectionInputEnd,
  // selectDirectionInputStart,
  selectDirectionsState
} from './selectors';
import { bboxAsBounds } from '../../utils/geo';
import { mapActions } from '../map/slice';

function* handleSearchChange(action) {
  const value = action.payload;
  if (value && value.length) {
    const results = yield call(fetchNominatim, value);

    const options = results.map(r => {
      const point = [r.geometry.coordinates[1], r.geometry.coordinates[0]];
      return {
        key: point.join(','),
        label: r.properties.display_name,
        point
      };
    });

    console.log(options);

    if (action.type === directionsActions.onSearchStart.type) {
      yield put(directionsActions.setStartOptions(options));
    } else {
      yield put(directionsActions.setEndOptions(options));
    }
  }
}

export function* handleChangeMean() {
  const state = yield select(selectDirectionsState);
  if (state.start && state.end) {
    yield put(directionsActions.navigate());
  }
}

function setBoundingBox(bbox) {
  window.LEAFLET_MAP.fitBounds(bboxAsBounds(bbox));
}

export function* fetchDirections() {
  const state = yield select(selectDirectionsState);
  if (!state.start || !state.end) {
    return;
  }
  try {
    const result = yield call(fetchOpenRouteService, state);
    yield put(directionsActions.endNavigation(result));
    yield put(directionsActions.forceUpdateNavigation());
    yield call(setBoundingBox, result.bbox);
  } catch (e) {
    console.log(e);
    if (e instanceof APIError) {
      console.error(e.payload.error.message);
      notification.error({ message: 'Spiacenti, percorso non trovato!' });
    } else {
      notification.error({
        message:
          'Non è stato possibile ottenere le indicazioni per via di un errore, controlla la tua connessione e riprova'
      });
    }
  }
}

function* handleMapClick(action) {
  const state = yield select(selectDirectionsState);
  if (state.selectFromMap) {
    yield put(directionsActions.toggleSelectFromMap());
    yield put(
      directionsActions.setStart([action.payload.lat, action.payload.lng])
    );
  } else if (state.selectFromMapDestination) {
    yield put(directionsActions.toggleSelectFromMapDestination());
    yield put(
      directionsActions.setEnd([action.payload.lat, action.payload.lng])
    );
  }
}

export function* directionsSaga() {
  yield debounce(700, directionsActions.onSearchStart.type, handleSearchChange);
  yield debounce(700, directionsActions.onSearchEnd.type, handleSearchChange);
  yield takeLatest(directionsActions.navigate.type, fetchDirections);
  yield takeLatest(directionsActions.invert.type, fetchDirections);
  yield takeLatest(directionsActions.setStart.type, handleChangeMean);
  yield takeLatest(directionsActions.setEnd.type, handleChangeMean);
  yield takeLatest(directionsActions.setTravelMean.type, handleChangeMean);
  yield takeLatest(mapActions.click.type, handleMapClick);
}
