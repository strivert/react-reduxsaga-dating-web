import axios from 'axios'

import {BASE_URL} from "../helper/index";

export async function fetchFavoriteProfilesAPI() {
  try {
    const response = await axios.get(`${BASE_URL}/profile_favorites`);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export async function fetchViewedProfilesAPI() {
  try {
    const response = await axios.get(`${BASE_URL}/profile_viewers`);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export async function deleteFavoriteProfileAPI(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/profile_favorites/${id}`);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}