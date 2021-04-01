import { combineReducers } from 'redux';

import search from './search/reducer';
import layers from './layers/slice';
import map from './map/slice';
import app from './app/slice';
import directions from './directions/slice';
import note from './notes/slice';
import userPosition from './userPosition/slice';

export default combineReducers({
  search,
  layers,
  map,
  app,
  directions,
  note,
  userPosition
});
