import { takeLatest, put, select, call } from 'redux-saga/effects';
import { noteActions } from './slice';
import { selectNoteState } from './selectors';
import { mapActions } from '../map/slice';
import { Button, notification } from 'antd';
import { saveNote } from '../../api';
import React from 'react';
import { OSM_URL } from '../../constants';

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
    const data = yield call(
      saveNote,
      state.position[0],
      state.position[1],
      action.payload.text
    );
    const idNode = data.querySelector('id');
    notification.success({
      message: 'Nota salvata con successo',
      description: (
        <Button href={`${OSM_URL}note/${idNode.textContent}`} target="_blank">
          Visualizza su OpenstreetMap
        </Button>
      )
    });
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
