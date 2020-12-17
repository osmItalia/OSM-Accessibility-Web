import { takeLatest, put, call, select } from 'redux-saga/effects';
import { layersActions } from './slice';
import { fetchLayer } from '../../api';
import { notification } from 'antd';
import { mapActions } from '../map/slice';
import { featuresWithGeometrySelector } from './selectors';
import { getZoom } from '../map/selectors';

function* fetch(action) {
  try {
    const response = yield call(fetchLayer, action.payload.name);
    console.log(response);
    yield put(
      layersActions.fetchEnd({
        data: response,
        name: action.payload.name,
        visibleAfterScale: action.payload.visibleAfterScale
      })
    );
  } catch (e) {
    console.log(e);
    notification.error({ message: 'Errore nel recuperare il layer' });
  }
}

function* filterFeatures(action) {
  const features = yield select(featuresWithGeometrySelector);
  const zoom = yield select(getZoom);

  const visible = features.filter(
    f =>
      zoom >= f.visibleAfterScale &&
      (!f.bounds || action.payload.contains(f.bounds))
  );
  yield put(layersActions.setVisibleFeatures(visible.map(f => f.id)));
}

export function* watchLayers() {
  yield takeLatest(layersActions.fetch.type, fetch);
  yield takeLatest(mapActions.setBounds.type, filterFeatures);
}
