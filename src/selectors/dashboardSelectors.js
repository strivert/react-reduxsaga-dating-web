import { createSelector } from 'reselect';

const selectNewMembers = state => state.getIn(['dashboard', 'newMembers']);
const selectFeedActivities = state => state.getIn(['dashboard', 'activities']);
const selectHasMoreActivities = state => state.getIn(['dashboard', 'hasMoreActivities']);
const selectProfileItem = state => state.getIn(['dashboard', 'profileItem']);
const selectPercentComplete = state => state.getIn(['dashboard', 'percentComplete']);
const selectNotifications = state => state.getIn(['dashboard', 'notifications']);
const selectSingleActivity = state => state.getIn(['dashboard', 'singleActivity']);

export const newMembersSelector = createSelector(
	selectNewMembers,
	(newMembers) => newMembers.toJS()
);

export const activitiesSelector = () => createSelector(
	selectFeedActivities,
	(activities) => activities.toJS()
);

export const hasMoreActivitiesSelector = () => createSelector(
	selectHasMoreActivities,
	(hasMore) => hasMore
);

export const profileItemSelector = createSelector(
	selectProfileItem,
	(profileItem) => {
		if (profileItem) {
			const key = Object.keys(profileItem.toJS())[0];
			return {attribute: key, profileItem: profileItem.toJS()[key]};
		}

		return null;
	}
);

export const percentCompleteSelector = createSelector(
	selectPercentComplete,
	(percent) => percent
);

export const notificationSelector = createSelector(
  selectNotifications,
  (notifications) => notifications
);

export const singleActivitySelector = createSelector(
	selectSingleActivity,
	(singleActivity) => (singleActivity? singleActivity.toJS(): null)
);
