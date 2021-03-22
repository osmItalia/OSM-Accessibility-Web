import { createSelector } from '@reduxjs/toolkit';

export const selectNoteState = state => state.note;

export const selectIsAddingNote = createSelector(
  selectNoteState,
  note => note.selectFromMap
);
