import flatten from 'lodash/flatten';

import {
	memberProfile,
  apologetics,
	dashboard,
	helpers,
	accountSettings,
	auth,
	profiles,
	viewersFavorite,
	messages,
	notifications,
	memberProfilePictures,
} from './sagas/index';

export default flatten([
	auth,
	profiles,
	accountSettings,
	memberProfile,
  apologetics,
	dashboard,
	viewersFavorite,
	messages,
	helpers,
	notifications,
	memberProfilePictures,
]);
