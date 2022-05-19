import { combineReducers } from 'redux';

import { reduce as CloneProfileWindowReducer } from './CloneProfileWindowState';

// Register your redux store under a unique namespace
export const namespace = 'flex-clone-profile';

export default combineReducers({
  cloneProfile: CloneProfileWindowReducer,
});
