import { all } from 'redux-saga/effects';
import { watchSearchChanges } from './search/sagas';
import { watchLayers } from './layers/saga';
import { directionsSaga } from './directions/sagas';

export default function* rootSaga() {
  yield all([watchSearchChanges(), watchLayers(), directionsSaga()]);
  // code after all-effect
}
