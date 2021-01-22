import { takeLatest, put, select, call } from 'redux-saga/effects';
import { noteActions } from './slice';
import { selectNoteState } from './selectors';
import { mapActions } from '../map/slice';
import { notification } from 'antd';
import { saveNote } from '../../api';

function* handleMapClick(action) {
  const state = yield select(selectNoteState);
  if (state.selectFromMap) {
    yield put(
      noteActions.setPosition([action.payload.lat, action.payload.lng])
    );
  }
}

function* handleSendNote(action) {
  const state = yield select(selectNoteState);
  try {
    yield call(
      saveNote,
      state.position[0],
      state.position[1],
      action.payload.text
    );
    notification.success({ message: 'Nota salvata con successo' });
    yield put(noteActions.close());
  } catch (e) {
    notification.error({ message: "C'è stato un'errore" });
    console.error(e);
  }
}

export function* noteSaga() {
  yield takeLatest(mapActions.click.type, handleMapClick);
  yield takeLatest(noteActions.sendNote.type, handleSendNote);
}
