import { put, call, takeEvery } from 'redux-saga/effects';

import {
	FETCH_CURRENT_USER_NOTIFICATIONS_REQUEST,
} from '../actions/types';
import { notificationsActions } from '../actions';
import { notificationsApi } from '../remote';

function* fetchUserNotifications() {
	const notifications = yield call(notificationsApi.fetchCurrentUserNotifications);
	yield put(notificationsActions.setCurrentUserNotifications(notifications.notifications));
}

function* fetchCurrentNotificationsWatcher() {
	yield takeEvery(FETCH_CURRENT_USER_NOTIFICATIONS_REQUEST, fetchUserNotifications);
}

export default [
	fetchCurrentNotificationsWatcher,
];