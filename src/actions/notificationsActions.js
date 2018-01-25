import {
	FETCH_CURRENT_USER_NOTIFICATIONS_REQUEST,
	SET_CURRENT_USER_NOTIFICATIONS
} from './types';

/**
 * Generate an action that instructs the saga middleware to initiate an action
 * to fetch the currently logged in user notifications
 */
export const fetchCurrentUserNotificationsRequest = () => ({type: FETCH_CURRENT_USER_NOTIFICATIONS_REQUEST});

/**
 * Generate an action that instructs the saga middleware to save the currently
 * logged in user notifications list
 */
export const setCurrentUserNotifications = (notifications) => ({type: SET_CURRENT_USER_NOTIFICATIONS, notifications});