import axios from 'axios';

import {BASE_URL} from "../helper/index";

/**
 * Retrieve the currently logged in user list of message threads
 *
 * @returns {Promise.<void>}
 */
export const fetchApologetics = async ({ page }) => {
	try {
		const apologetics = await axios.get(`${BASE_URL}/apologetics?page=${page}`);
		return apologetics.data;
	} catch (error) {
		console.log(error);
	}
}
