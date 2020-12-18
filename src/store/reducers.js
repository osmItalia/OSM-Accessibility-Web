import { combineReducers } from 'redux';

import search from './search/reducer';
import layers from './layers/slice';
import map from './map/slice';
import app from './app/slice';

export default combineReducers({
  search,
  layers,
  map,
  app
});
