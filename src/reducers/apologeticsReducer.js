import { fromJS } from 'immutable';

import {
  SET_APOLOGETICS
} from '../actions/types'

const initialState = fromJS({
  apologetics: fromJS([]),
  hasMoreApologetics: false,
});

export default (state=initialState, action) => {
	switch (action.type) {
		case SET_APOLOGETICS:
			const newState = state.update('apologetics', apologetics => apologetics.concat(fromJS(action.apologetics.apologetic_answers)));
			return newState.set('hasMoreApologetics', action.apologetics.meta.more_results); 
		default:
			return state;
	}
}
