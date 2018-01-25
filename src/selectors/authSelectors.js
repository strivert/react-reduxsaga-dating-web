import { createSelector } from 'reselect';

const selectAuthDomain = (state) => state.get('auth');
const selectAuthCurrentUserDomain = (state) => state.getIn(['auth', 'currentUser']);

const selectAuth = () => createSelector(
  selectAuthDomain, 
  (substate) => substate.toJS()
)

const selectCurrentUser = () => createSelector(
  selectAuthCurrentUserDomain,
  (substate) => (substate? substate.toJS(): null)
)

export {
  selectAuth, 
  selectCurrentUser 
};