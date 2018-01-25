import { fromJS } from 'immutable';

import {
	SET_CURRENT_USER_NOTIFICATIONS
} from '../actions/types'

const initialState = fromJS({
	notifications: fromJS([])
});

export default (state=initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER_NOTIFICATIONS:
			return state.set('notifications', fromJS(action.notifications));
		default:
			return state;
	}
}