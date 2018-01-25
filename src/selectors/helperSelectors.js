import { createSelector } from 'reselect';

const selectIsLoading = (state) => state.getIn(['helpers', 'isLoading']);

const selectNotificationDomain = (state) => state.getIn(['helpers', 'notification']);

export const isLoadingSelector = () => createSelector(
	selectIsLoading,
	(isLoading) => isLoading
);

export const selectNotification = () => createSelector(
	selectNotificationDomain,
	(substate) => (substate? substate.toJS(): null)
);
