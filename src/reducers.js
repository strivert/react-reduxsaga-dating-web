import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';

import {
  memberProfile,
  dashboard,
  apologetics,
  helpers,
  accountSettings,
  auth,
  profiles,
  viewersFavorite,
	messages,
  notifications,
  memberProfilePictures,
  async,
} from './reducers/index';

// Basic setup
export default (asyncReducers) => combineReducers({
  routing: routerReducer,
  auth,
  profiles,
	memberProfile,
  dashboard,
  apologetics,
  helpers,
  viewersFavorite,
  accountSettings,
  messages,
  notifications,
  memberProfilePictures,
  async,
  ...asyncReducers
})
