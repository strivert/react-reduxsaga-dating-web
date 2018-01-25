import axios from 'axios';

import {BASE_URL} from "../helper/index";

/**
 * Retrieve the currently logged in user list of message threads
 *
 * @returns {Promise.<void>}
 */
export  const fetchCurrentUserMessageThreads = async () => {
	try {
		const threads = await axios.get(`${BASE_URL}/message_threads`);
		return threads.data;
	} catch (error) {

	}
}

/**
 * Retrieve the messages list for the given thread id
 *
 * @param threadId
 * @returns {Promise.<void>}
 */
export const fetchCurrentThreadMessages = async (threadId) => {
	try {
		const messages = await axios.get(`${BASE_URL}/message_threads/${threadId}/messages`);
		return messages.data;
	} catch (error) {
		console.log(error);
	}
}

/**
 * Send the given message to the appropriate recipient (recipient included in body) 
 * 
 * @param message 
 */
export const sendMessage = async (msg) => {
	try {
		const message = await axios.post(`${BASE_URL}/messages`, msg);
		return message.data;
	} catch (error) {
		if(error.response.status === 403) {
			return {'error': 403};
		}
	}
}

/**
 * Delete the messages for the given thread id
 * 
 * @param threadId
 * @returns {Promise.<void>}
 */
export const deleteMessageThread = async (threadId) => {
	try {
		const response = await axios.delete(`${BASE_URL}/message_threads/${threadId}`);
		return response;
	} catch (error) {
		console.log(error);
	}
}