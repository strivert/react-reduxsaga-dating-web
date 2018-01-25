import { createSelector } from 'reselect';

const selectCurrentUserProfilePictures = (state) => state.getIn(['memberProfilePictures', 'profilePictures']);
const selectUserProfilePictures = (state) => state.getIn(['memberProfilePictures', 'profilePictures']);

export const currentUserMainProfilePictureSelector = () => createSelector(
	selectCurrentUserProfilePictures,
	pictures => {
		return pictures.toJS().find(picture => {
			return picture.primary
		});
	}
);

export const currentUserProfilePictureSelector = () => createSelector(
	selectUserProfilePictures,
	(substate) => (substate? substate.toJS(): null)
);