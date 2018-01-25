import { put, call, takeEvery } from 'redux-saga/effects';

import {
	FETCH_MESSAGE_THREADS_REQUEST,
	FETCH_THREAD_MESSAGES_REQUEST,
	POST_MESSAGE_REQUEST,
	DELETE_MESSAGE_THREAD_REQUEST
} from '../actions/types';

import { messagesActions, helperActions, accountSettingActions, viewersFavoriteActions } from '../actions';
import { messagesApi, viewersFavoriteApi } from '../remote';

function* fetchFavoriteProfiles() {
  try {
    const { data } = yield call(viewersFavoriteApi.fetchFavoriteProfilesAPI);
    yield put(viewersFavoriteActions.fetchFavoriteProfilesSuccess(data.profiles));
  } catch (e) {
    yield put(helperActions.setToast({toastType: 'failure', message: 'Not found'}));
  }
}

function* fetchMessageThreads() {
	yield put(helperActions.setComponentLoadingRequest(true));
	const threads = yield call(messagesApi.fetchCurrentUserMessageThreads);
	yield put(messagesActions.setMessageThreads(threads.message_threads));
	yield call(fetchFavoriteProfiles);
	yield put(helperActions.setComponentLoadingRequest(false));
}

function* fetchMessageThreadsWatcher() {
	yield takeEvery(FETCH_MESSAGE_THREADS_REQUEST, fetchMessageThreads)
}

function* fetchThreadMessages({threadId}) {
	yield put(helperActions.setComponentLoadingRequest(true));
	const messages = yield call(messagesApi.fetchCurrentThreadMessages, threadId);
	yield put(messagesActions.setThreadMessages(messages.messages))
	yield put(helperActions.setComponentLoadingRequest(false));
}

function* fetchThreadMessagesWatcher() {
	yield takeEvery(FETCH_THREAD_MESSAGES_REQUEST, fetchThreadMessages);
}

function* postMessage({message}) {
	const msg = yield call(messagesApi.sendMessage, message);
	const { error } = msg;
	if (error === 403) {
		yield put(accountSettingActions.accountUpgradeRequiredRequest({upgrade_required: true}));
	} else {
		yield put(messagesActions.setPostedMessage(msg.message));
	}
	yield put(messagesActions.setSendingMessage(false));
}

function* postMessageRequestWatcher() {
	yield takeEvery(POST_MESSAGE_REQUEST, postMessage);
}

function* deleteMessageThread({threadId}) {
	yield put(helperActions.setComponentLoadingRequest(true));
	yield call(messagesApi.deleteMessageThread, threadId);
	
	const {message_threads} = yield call(messagesApi.fetchCurrentUserMessageThreads);
	yield put(messagesActions.setMessageThreads(message_threads));
	const currentThread = message_threads[0]
	const nextThread = message_threads[1]
	
	if (currentThread) {
		const messages = yield call(messagesApi.fetchCurrentThreadMessages, currentThread.id);
		yield put(messagesActions.setThreadMessages(messages.messages))

		yield put(messagesActions.setActiveThread([currentThread.id, nextThread]));
	}

	yield put(helperActions.setComponentLoadingRequest(false));
}

function* deleteMessageThreadRequestWatcher() {
	yield takeEvery(DELETE_MESSAGE_THREAD_REQUEST, deleteMessageThread);
}

export default [
	fetchMessageThreadsWatcher,
	fetchThreadMessagesWatcher,
	postMessageRequestWatcher,
	deleteMessageThreadRequestWatcher
];
