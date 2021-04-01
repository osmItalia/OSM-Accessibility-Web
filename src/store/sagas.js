import { all } from 'redux-saga/effects';
import { watchSearchChanges } from './search/sagas';
import { watchLayers } from './layers/saga';
import { directionsSaga } from './directions/sagas';
import { noteSaga } from './notes/sagas';
import { watchUserPosition } from './userPosition/sagas';

export default function* rootSaga() {
  yield all([
    watchSearchChanges(),
    watchLayers(),
    directionsSaga(),
    noteSaga(),
    watchUserPosition()
  ]);
  // code after all-effect
}
