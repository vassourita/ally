import { combineReducers } from 'redux';

import user from './user/reducer';
import auth from './auth/reducer';
import jobs from './jobs/reducer';
import proposals from './proposals/reducer';
import notifications from './notifications/reducer';

export default combineReducers({
  user,
  auth,
  jobs,
  proposals,
  notifications,
});
