import { createSelector } from 'reselect';

const selectProfileDomain = (state) => state.get('profiles');

export const selectProfile = () => createSelector(
  selectProfileDomain,
  (substate) => (substate? substate.toJS(): null)
);
