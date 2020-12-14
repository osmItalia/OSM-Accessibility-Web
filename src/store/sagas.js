import { all } from 'redux-saga/effects';
import { watchSearchChanges } from './search/sagas';

export default function* rootSaga() {
  yield all([watchSearchChanges()]);
  // code after all-effect
}
