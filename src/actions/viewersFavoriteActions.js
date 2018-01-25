import {
  FETCH_FAVORITE_VIEWER_REQUEST,
  FETCH_FAVORITE_PROFILES_SUCCESS,
  FETCH_VIEWER_PROFILES_SUCCESS,
  DELETE_FAVORITE_PROFILE_REQUEST,
  DELETE_FAVORITE_PROFILE_SUCCESS,
} from "./types";

export const fetchProfileRequest = (category) => ({
  type: FETCH_FAVORITE_VIEWER_REQUEST,
  category
});

export const fetchFavoriteProfilesSuccess = (favorites) => ({
  type: FETCH_FAVORITE_PROFILES_SUCCESS,
  favorites
});

export const fetchViewedProfilesSuccess = (viewers) => ({
  type: FETCH_VIEWER_PROFILES_SUCCESS,
  viewers
});

export const deleteFavoriteProfileRequest = (id) => ({
  type: DELETE_FAVORITE_PROFILE_REQUEST,
  id
});

export const deleteFavoriteProfileSuccess = (id) => ({
  type: DELETE_FAVORITE_PROFILE_SUCCESS,
  id
});
