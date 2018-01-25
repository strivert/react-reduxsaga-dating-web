import { createSelector } from 'reselect';

export const statusesSelector = () => createSelector(
	(state) => state.getIn(['async', 'statuses']),
	(statuses) => statuses.toJS()
);

export const errorsSelector = () => createSelector(
	(state) => state.getIn(['async', 'errors']),
	(errors) => errors.toJS()
);
