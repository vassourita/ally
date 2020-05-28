import { combineReducers } from 'redux';

import user from './user/reducer';
import auth from './auth/reducer';
import jobs from './jobs/reducer';
import notifications from './notifications/reducer';

export default combineReducers({
  user,
  auth,
  jobs,
  notifications,
});
