import { createSelector } from 'reselect';

const selectFavoriteProfilesDomain = (state) => state.getIn(['viewersFavorite', 'favorites']);
const selectViewerProfilesDomain = (state) => state.getIn(['viewersFavorite', 'viewers']);

const selectFavoriteProfiles = () => createSelector(
  selectFavoriteProfilesDomain,
  (substate) => (substate? substate.toJS(): null)
);

const selectViewerProfiles = () => createSelector(
  selectViewerProfilesDomain,
  (substate) => (substate? substate.toJS(): null)
)

export {
  selectFavoriteProfiles,
  selectViewerProfiles,
}
