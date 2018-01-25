import axios from 'axios';
import { BASE_URL } from '../helper/index.js'

/**
 * Fetch the list of members who signed up recently
 *
 * @returns {Promise<T>}
 */
export const fetchNewMembersList = async () => {
	try {
		const members = await axios.get(`${BASE_URL}/profile_recent_signups?per=5`);
		return members.data;
	} catch (error) {
		console.log(error)
	}
}

/**
 *  Fetch all current members recent activities
 *
 * @param page
 * @returns {Promise.<void>}
 */
export const fetchAllMembersRecentActivities = async ({ page, filter }) => {
	try {
		const activities = await axios.get(`${BASE_URL}/activities?activity[group]=${filter}&page=${page}`);
		return activities.data;
	} catch (error) {
		console.log(error);
	}
}

/**
 * Fetch the next incomplete profile item for the currently logged in user
 *
 * @returns {Promise.<void>}
 */
export const fetchNextIncompleteProfileItem = async () => {
	try {
		const profileItem = await axios.get(`${BASE_URL}/account/profile/next_incomplete`);
		return profileItem.data;
	} catch (error) {
		console.log(error);
	}
}

/**
 * Update the currently logged in user profile
 *
 * @param profile
 * @returns {Promise<T>}
 */
export const updateUserProfile = async (profile) => {
	try {
		const response = await axios.put(`${BASE_URL}/account/profile`, profile);
		return response;
	} catch (error) {
		throw new Error(error);
	}
}

/**ǚ
 *  Fetch all current members recent activities
 *
 * @param page
 * @returns {Promise.<void>}
 */
export const fetchNotifications = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/notifications`);
		return response.data
	} catch (error) {
		console.log(error);
	}
}

/**
 * Fetch a single activity
 *
 * @param acitivity id
 * @returns {Promise<T>}
 */
export const fetchSingleActivity = async (activityId) => {
	try {
		const response = await axios.get(`${BASE_URL}/activities/${activityId}`);
		return response;
	} catch (error) {
		throw new Error(error);
	}
}
