import axios from 'axios';
import { BASE_URL } from '../helper/index.js'

/**
 * Fetch the given member's id profile data
 *
 * @param memberId
 * @returns {Promise<T>}
 */
export const fetchCurrentMemberProfile = async (memberId) => {
	try {
		const currentMember = await axios.get(`${BASE_URL}/profiles/${memberId}`);
		return currentMember.data;
	} catch (error) {
		throw new Error(error);
	}
}

/**
 * Request that the given member's id be marked as a favorite
 * for the currently logged in user
 *
 * @param memberId
 * @returns {Promise<T>}
 */
export const markCurrentMemberAsFavorite = async (memberId) => {
	try {
		// TODO: implement a flash system that would let the user know if the favoriting was successful
		const response = await axios.post(`${BASE_URL}/profile_favorites?profile_favorite[user_id]=${memberId}`)
		return response;
	} catch (error) {
		console.log(error);
	}
}

/**
 * Request that the given member's id be unmarked as a favorite
 * for the currently logged in user
 *
 * @param memberId
 * @returns {Promise<T>}
 */
export const unmarkCurrentMemberAsFavorite = async (memberId) => {
	try {
		// TODO: implement a flash system that would let the user know if the favoriting was successful
    const response = await axios.delete(`${BASE_URL}/profile_favorites/${memberId}`)
		return response;
	} catch (error) {
		console.log(error);
	}
}

export const fetchCurrentMemberActivity = async (userId) => {
	try {
		const response = await axios.get(`${BASE_URL}/activities?activity[user_id]=${userId}`);
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
}

export const blockUserAPI = async (memberId) => {
	try {
		// TODO: implement a flash system that would let the user know if the favoriting was successful
		const response = await axios.post(`${BASE_URL}/profile_blocks`, {
			"profile_block": {
				"user_id": memberId
			}});
		return response;
	} catch (error) {
		console.log(error);
	}
}

export const reportUserAPI = async (payload) => {
	try {
		// TODO: implement a flash system that would let the user know if the favoriting was successful
		const response = await axios.post(`${BASE_URL}/profile_reports`, { "profile_report": payload })
		return response;
	} catch (error) {
		console.log(error);
	}
}

export const sendIceBreakerAPI = async (payload) => {
	try {
		const response = await axios.post(`${BASE_URL}/icebreakers`, { "icebreaker": payload })
		return response;
	} catch (error) {
		if(error.response.status === 403) {
			return {'error': 403};
		}
	}
}

export const fetchDefaultSearchParamsAPI = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/profiles/default_params`)
		return response;
	} catch (error) {
		console.log(error);
	}
}

export const setDefaultSearchParamsAPI = async (params) => {
	try {
		const response = await axios.put(`${BASE_URL}/profiles/default_params`, params)
		return response;
	} catch (error) {
		console.log(error);
	}
}
