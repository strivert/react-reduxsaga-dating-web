import { fromJS } from 'immutable';
import jwtDecode from 'jwt-decode';
import { LOGIN_SUCCESS, AUTH_USER, LOGOUT_SUCCESS} from '../actions/types';

const initialState = fromJS({
  notification: null,
  currentUser: null,
});

const decodeToken = (token) => {
  const {
    user_id,
    user_name,
    limited,
    profile_photo_url_large,
    profile_photo_url_small,
    show_states,
    show_zipcodes,
    country_id,
    requires_onboarding,
  } = jwtDecode(token);
  console.log(jwtDecode(token));
  return { user_id, user_name, limited, profile_photo_url_large, profile_photo_url_small, show_states, show_zipcodes, country_id, requires_onboarding };
}

export default (state=initialState, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
    case AUTH_USER:
      return state.set('currentUser', fromJS(decodeToken(action.token)));
    case LOGOUT_SUCCESS:
      return state.set('currentUser', null);
    default:
      return state;
  }
}
