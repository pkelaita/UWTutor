import { combineReducers } from 'redux';

import user from './user';

/**
 * Root reducer - controls Redux state.
 */
export default combineReducers({
  user,
});
