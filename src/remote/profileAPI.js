import axios from 'axios';
import { formatProfileSearchQuery } from '../utils';

import { BASE_URL } from "../helper/index";

export async function fetchAllProfilesAPI() {
  try {
    const response = await axios.get(`${BASE_URL}/profiles`);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export async function profileSearchAPI(queryOpts, per, page) {
  try {
    let queryString = formatProfileSearchQuery(queryOpts);
    queryString += (per) ? `&per=${per}`: '';
    queryString += (page) ? `&page=${page}`: '';
    const response = await axios.get(`${BASE_URL}/profiles?${queryString}`);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}
