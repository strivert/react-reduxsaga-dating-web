import axios from 'axios';
import {BASE_URL} from '../helper';

export const likeActivityAPI = async (activityId) => {
	try {
		const response = await axios.post(`${BASE_URL}/activities/${activityId}/likes`);
		return response;
	} catch (e) {
		throw new Error(e);
	}
}

export const unLikeActivityAPI = async ({activityId, likeId}) => {
	try {
		const response = await axios.delete(`${BASE_URL}/activities/${activityId}/likes/${likeId}`);
		return response;
	} catch (e) {
		throw new Error(e);
	}
}

export const postCommentAPI = async ({activityId, payload}) => {
  try {
    const response = await axios.post(`${BASE_URL}/activities/${activityId}/comments`, {comment: payload});
    return response;
  } catch (error) {
    if(error.response.status === 403) {
	  return {'error': 403};
	}
  }
}