import axios from 'axios';

import { BASE_URL } from '../helper/index';

/**
 * Fetch the currently logged in user profile pictures
 *
 * @returns {Promise.<void>}
 */
export const fetchCurrentUserProfilePictures = async () => {
	try {
		const pictures = await axios.get(`${BASE_URL}/account/photos`);
		return pictures.data;
	} catch (error) {
		if(error.response.status === 403) {
			return {'error': 403};
		}
	}
}

/**
 * Upload and add a picture to the currently logged in user profile
 *
 * @param data
 * @returns {Promise.<void>}
 */
export const uploadProfilePicture = async (data) => {
	try {
		const picture = await axios.post(`${BASE_URL}/account/photos`, data);
		return picture.data;
	} catch (error) {
		console.log(error);
	}
}

/**
 * delete a primary file
 *
 * @param photoId
 * @returns {Promise.<void>}
 */
export const deleteProfilePicture = async (photoId) => {
	try {
		const response = await axios.delete(`${BASE_URL}/account/photos/${photoId}`);
		return response;
	} catch (error) {
		console.log(error);
	}
}