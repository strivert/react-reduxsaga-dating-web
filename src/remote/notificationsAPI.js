import axios from 'axios'

import { BASE_URL } from "../helper/index";

export const fetchCurrentUserNotifications = async () => {
	try {
		const notifications = await axios.get(`${BASE_URL}/notifications`);
		return notifications.data
	} catch (error) {
		console.log(error);
	}
}