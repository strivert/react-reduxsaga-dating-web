import { fromJS } from 'immutable';
import {
  FETCH_FAVORITE_PROFILES_SUCCESS,
  FETCH_VIEWER_PROFILES_SUCCESS,
  DELETE_FAVORITE_PROFILE_SUCCESS,
} from '../actions/types';

const initialState = fromJS({});

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVORITE_PROFILES_SUCCESS:
    return state.set('favorites', fromJS(action.favorites));
    case FETCH_VIEWER_PROFILES_SUCCESS:
      return state.set('viewers', fromJS(action.viewers));
    case DELETE_FAVORITE_PROFILE_SUCCESS:
      return state.update('favorites', (favoriteValue) => favoriteValue.filter(v => v.get('id') !== action.id));
    default:
      return state;
  }
};
