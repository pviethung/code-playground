import { combineReducers } from 'redux';
import { bundleReducer } from './bundleReducer';
import { cellReducer } from './cellReducer';

const rootReducer = combineReducers({
  cell: cellReducer,
  bundle: bundleReducer,
});

export { rootReducer };
