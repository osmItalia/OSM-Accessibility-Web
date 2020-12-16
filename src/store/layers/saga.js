import { takeLatest, put, call } from 'redux-saga/effects';
import { layersActions } from './slice';
import { fetchLayer } from '../../api';
import { notification } from 'antd';

function* fetch(action) {
  try {
    const response = yield call(fetchLayer, action.payload);
    console.log(response);
    yield put(
      layersActions.fetchEnd({
        data: response,
        name: action.payload
      })
    );
  } catch (e) {
    console.log(e);
    notification.error({ message: 'Errore nel recuperare il layer' });
  }
}

export function* watchLayers() {
  yield takeLatest(layersActions.fetch.type, fetch);
}
