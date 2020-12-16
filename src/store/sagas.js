import { all } from 'redux-saga/effects';
import { watchSearchChanges } from './search/sagas';
import { watchLayers } from './layers/saga';

export default function* rootSaga() {
  yield all([watchSearchChanges(), watchLayers()]);
  // code after all-effect
}
