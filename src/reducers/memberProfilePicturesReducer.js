import { fromJS } from 'immutable';

import {
	SET_PROFILE_PICTURES
} from '../actions/types'

const initialState = fromJS({
	profilePictures: fromJS([])
});

export default (state=initialState, action) => {
	switch (action.type) {
		case SET_PROFILE_PICTURES:
			return state.set('profilePictures', fromJS(action.pictures));
		default:
			return state;
	}
};