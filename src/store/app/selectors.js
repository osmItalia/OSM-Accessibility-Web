export const getAppState = state => state.app;

export const getIsSelectingFromMap = state =>
  state.note.selectFromMap || state.directions.selectFromMap;
