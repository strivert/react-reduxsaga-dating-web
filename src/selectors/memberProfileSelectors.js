import { createSelector } from 'reselect';

const selectCurrentMemberProfile = state => state.getIn(['memberProfile', 'current_member']);
const selectCurrentMemberActivies = state => state.getIn(['memberProfile', 'current_member_activities']);
const selectDefaultSearchParams = state => state.getIn(['memberProfile', 'default_search_params']);

export const currentMemberProfileSelector = () => createSelector(
	selectCurrentMemberProfile,
	(substate) => (substate? substate.toJS(): null)
);

export const currentMemberActivitiesSelector = () => createSelector(
	selectCurrentMemberActivies,
	(substate) => (substate? substate.toJS(): null)
);

export const defaultSearchParamsSelector = () => createSelector(
	selectDefaultSearchParams,
	(substate) => (substate? substate.toJS(): null)
);