import axios from 'axios';

import { setAuthorizationHeader } from '../utils'
import * as memberProfileApi from './memberProfileAPI';
import * as dashboardApi from './dashboardAPI';
import * as accountSettingApi from './accountSettingAPI';
import * as authApi from './authAPI';
import * as profileApi from './profileAPI';
import * as viewersFavoriteApi from './viewersFavoriteAPI';
import * as messagesApi from './messagesApi';
import * as notificationsApi from './notificationsAPI';
import * as memberProfilePicturesApi from './memberProfilePicturesAPI';
import * as activityPostsApi from './activityPostsAPI';
import * as apologeticsApi from './apologeticsAPI';

axios.defaults.headers.common['Authorization'] = setAuthorizationHeader();

export {
	memberProfileApi,
	dashboardApi,
	accountSettingApi,
	authApi,
	profileApi,
	viewersFavoriteApi,
	messagesApi, 
	notificationsApi,
	memberProfilePicturesApi,
  activityPostsApi,
  apologeticsApi
};
