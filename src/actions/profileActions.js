import { 
  TOGGLE_GALLERY, 
  FETCH_PROFILES_FAILURE, 
  FETCH_PROFILES_SUCCESS,
  FETCH_PROFILES_REQUEST,
  SEARCH_PROFILES_REQUEST,
  SET_PROFILES_EMPTY
} from './types';

export const toggleGallery = () => ({ type: TOGGLE_GALLERY });

export const fetchProfileRequest = () => ({
  type: FETCH_PROFILES_REQUEST
});

export const fetchProfileSuccess = (profiles) => ({
  type: FETCH_PROFILES_SUCCESS,
  profiles
});

export const fetchProfileFailure = (message) => ({
  type: FETCH_PROFILES_FAILURE,
  message
});

export const profileSearchRequest = (queryOpts, per, page, isNew) => ({
  type: SEARCH_PROFILES_REQUEST,
  queryOpts,
  per,
  page,
  isNew
});

export const setProfileEmpty = () => ({
  type: SET_PROFILES_EMPTY
});