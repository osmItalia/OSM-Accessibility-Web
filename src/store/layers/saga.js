import { takeLatest, put, call, select, takeEvery } from 'redux-saga/effects';
import { layersActions } from './slice';
import { fetchLayer } from '../../api';
import { notification } from 'antd';
import { mapActions } from '../map/slice';
import {
  featuresWithGeometrySelector,
  getA11yFilter,
  getLayers
} from './selectors';
import { getBounds, getZoom } from '../map/selectors';

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
    yield put(mapActions.setBounds(window.LEAFLET_MAP.getBounds()));
  } catch (e) {
    console.log(e);
    notification.error({ message: 'Errore nel recuperare il layer' });
  }
}

function* filterFeatures() {
  const features = yield select(featuresWithGeometrySelector);
  const zoom = yield select(getZoom);
  const bounds = yield select(getBounds);
  const layers = yield select(getLayers);
  const filters = yield select(getA11yFilter);

  const visible = features.filter(f => {
    let filtered = filters.unknown;

    if (f.properties.wheelchair) {
      filtered = filters[f.properties.wheelchair];
    }

    return (
      zoom >= f.visibleAfterScale &&
      (!f.bounds || bounds.contains(f.bounds)) &&
      layers.includes(f.layer) &&
      filtered
    );
  });

  yield put(layersActions.setVisibleFeatures(visible.map(f => f.id)));
}

export function* watchLayers() {
  yield takeEvery(layersActions.fetch.type, fetch);
  yield takeLatest(mapActions.setBounds.type, filterFeatures);
  yield takeLatest(layersActions.toggleLayer.type, filterFeatures);
  yield takeLatest(layersActions.toggleFilter.type, filterFeatures);
  yield takeLatest(layersActions.setShowAll.type, filterFeatures);
}
