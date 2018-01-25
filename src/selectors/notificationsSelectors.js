import { createSelector } from 'reselect';

const selectNotifications = (state) => state.getIn(['notifications', 'notifications']);

export const userNotificationsSelector = createSelector(
	selectNotifications,
	(notifications) => notifications.toJS()
);