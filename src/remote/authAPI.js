import axios from 'axios';

import {BASE_URL} from "../helper/index";

export async function loginRequestAPI(auth) {
  try {
    const response = await axios.post(`${BASE_URL}/member_token`, {auth})
    return response;
  } catch (e) {
    throw new Error(e)
  }
}

export const logout = async () => {
  try {
		const response = await axios.delete(`${BASE_URL}/member_token`);
	  return response;
  } catch (error) {
  	console.log(error);
  }
}