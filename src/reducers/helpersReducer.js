import { fromJS } from 'immutable';

import { SET_COMPONENT_LOADING, DISMISS_TOASTER, SET_TOAST } from '../actions/types';
import { LOCATION_CHANGE } from 'react-router-redux';
const initialState = fromJS({
	isLoading: false,
	notification: null,
});

export default (state=initialState, action) => {
	switch (action.type) {
		case SET_COMPONENT_LOADING:
			return state.set('isLoading', action.isLoading);
		case DISMISS_TOASTER:
		case LOCATION_CHANGE:
      return state.set('notification', null);
    case SET_TOAST:
      return state.set('notification', fromJS({type: action.toastType, message: action.message}));
		default:
			return state;
	}
}