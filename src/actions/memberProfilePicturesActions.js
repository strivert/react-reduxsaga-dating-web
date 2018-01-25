import {
	FETCH_PROFILE_PICTURES_REQUEST,
	UPLOAD_PROFILE_PICTURE_REQUEST,
	SET_PROFILE_PICTURES
} from './types';

/**
 * Generate an action that instructs the saga middleware to initiate a request to fetch
 * the currently logged in user profile pictures
 *
 * @param memberId
 */
export const fetchCurrentUserProfilePicture = () => ({type: FETCH_PROFILE_PICTURES_REQUEST});


/**
 * Generate an action that instructs the saga middleware to save the currently logged in
 * user's profile pictures to the redux store
 *
 * @param pictures
 */
export const setCurrentUserProfilePictures = (pictures) => ({type: SET_PROFILE_PICTURES, pictures});

/**
 * Generate an action that instructs the saga middleware to initiate a request to upload
 * the currently logged in user profile pictures
 *
 * @param data
 */
export const uploadProfilePictureRequest = (data, mainPicId) => ({type: UPLOAD_PROFILE_PICTURE_REQUEST, data, mainPicId});