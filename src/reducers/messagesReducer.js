import { fromJS } from 'immutable';

import {
	SET_MESSAGE_THREADS,
	SET_THREAD_MESSAGES,
	SET_ACTIVE_THREAD,
	SET_POSTED_MESSAGE,
	SET_SENDING_MESSAGE
} from '../actions/types'

const initialState = fromJS({
	messageThreads: fromJS([]),
	threadMessages: fromJS([]),
	activeThread: fromJS([]),
	isSending: false
});

export default (state=initialState, action) => {
	switch (action.type) {
		case SET_MESSAGE_THREADS:
			return state.set('messageThreads', fromJS(action.threads));
		case SET_THREAD_MESSAGES:
			return state.set('threadMessages', fromJS(action.messages));
		case SET_ACTIVE_THREAD:
			return state.set('activeThread', fromJS(action.activeThread));
		case SET_POSTED_MESSAGE:
			return state.update('threadMessages', messages => messages.insert(0, action.message));
		case SET_SENDING_MESSAGE:
			return state.set('isSending', action.status);
		default:
			return state;
	}
}