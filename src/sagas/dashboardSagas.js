import { put, call, takeEvery } from 'redux-saga/effects';

import {
	FETCH_NEW_MEMBERS_REQUEST,
	FETCH_ALL_MEMBERS_ACTIVITIES_REQUEST,
	FETCH_NEXT_INCOMPLETE_PROFILE_ITEM_REQUEST,
	UPDATE_PROFILE_ITEM_REQUEST,
  	FETCH_NOTIFICATIONS_REQUEST,
	LIKE_ACTIVITY_REQUEST,
	UN_LIKE_ACTIVITY_REQUEST,
	POST_COMMENT_REQUEST,
	FETCH_SINGLE_ACTIVITY_REQUEST,
	LIKE_SINGLE_ACTIVITY_REQUEST,
	UN_LIKE_SINGLE_ACTIVITY_REQUEST,
	POST_SINGLE_COMMENT_REQUEST
} from '../actions/types';
import { dashboardActions, helperActions, accountSettingActions } from '../actions';
import { dashboardApi, activityPostsApi } from '../remote';
import { reportPending, reportSuccess } from '../helper/async';

function* fetchNewMembers() {
	const members = yield call(dashboardApi.fetchNewMembersList)
	yield put(dashboardActions.setNewMembers(members.profiles));
}

function* fetchNewMembersWatcher() {
	yield takeEvery(FETCH_NEW_MEMBERS_REQUEST, fetchNewMembers);
}

function* fetchAllMembersRecentActivities({ payload }) {
	yield reportPending(FETCH_ALL_MEMBERS_ACTIVITIES_REQUEST);
	const activities = yield call(dashboardApi.fetchAllMembersRecentActivities, payload);
	yield put(dashboardActions.setDashboardFeedActivities(activities));
	yield reportSuccess(FETCH_ALL_MEMBERS_ACTIVITIES_REQUEST);
}

function* fetchAllMembersActivitiesWatcher() {
	yield takeEvery(FETCH_ALL_MEMBERS_ACTIVITIES_REQUEST, fetchAllMembersRecentActivities);
}

function* fetchNextIncompleteProfileItem() {
	const profileItem = yield call(dashboardApi.fetchNextIncompleteProfileItem);
	yield put(dashboardActions.setNextProfileItem(profileItem));
}

function* fetchNexIncompleteProfileItemWatcher() {
	yield takeEvery(FETCH_NEXT_INCOMPLETE_PROFILE_ITEM_REQUEST, fetchNextIncompleteProfileItem);
}

function* updateCurrentUserProfile({profile}) {
	try {
		yield call(dashboardApi.updateUserProfile, profile);
		yield put(dashboardActions.setProfileUpdatedSuccess());
		yield put(dashboardActions.fetchNextProfileItemRequest());
	} catch(error) {
		yield put(dashboardActions.setProfileUpdatedError());
	}
}

function* updateCurrentUserProfileWatcher() {
	yield takeEvery(UPDATE_PROFILE_ITEM_REQUEST, updateCurrentUserProfile)
}

function* fetchNotifications() {
	const notifications = yield call(dashboardApi.fetchNotifications)
	yield put(dashboardActions.setNotifications(notifications));
}

function* fetchNotificationsWatcher() {
	yield takeEvery(FETCH_NOTIFICATIONS_REQUEST, fetchNotifications);
}

function* likeActivity({activityId}) {
	try {
		const {data} = yield call(activityPostsApi.likeActivityAPI, activityId);
		yield put(dashboardActions.likeActivitySuccess(activityId, data.activity_like));
	} catch (e) {
		yield put(helperActions.setToast({toastType: 'failure', message: 'Failed to like activity. Try again!!'}))
	}
}

function* likeActivityWatcher() {
	yield takeEvery(LIKE_ACTIVITY_REQUEST, likeActivity);
}

function* unLikeActivity(action) {
	try {
		yield call(activityPostsApi.unLikeActivityAPI, action);
		yield put(dashboardActions.unLikeActivitySuccess(action.activityId, action.likeId));
	} catch (e) {
		yield put(helperActions.setToast({toastType: 'failure', message: 'Failed to like activity. Try again!!'}))
	}
}

function* unLikeActivityWatcher() {
	yield takeEvery(UN_LIKE_ACTIVITY_REQUEST, unLikeActivity);
}

function* postComment(action) {
  try {
		const {data, error} = yield call(activityPostsApi.postCommentAPI, action);
		if (error === 403) {
			yield put(accountSettingActions.accountUpgradeRequiredRequest({upgrade_required: true}));
		} else {
    		yield put(dashboardActions.postCommentSuccess(action.activityId, data.activity_comment));
    	}
  } catch (e) {
    yield put(helperActions.setToast({toastType: 'failure', message: 'Failed to post comment. Try again!!'}))
  }
}

function* postCommentWatcher() {
  yield takeEvery(POST_COMMENT_REQUEST, postComment);
}

function* fetchSingleActivity({activityId}) {
	try {
	    yield put(helperActions.setComponentLoading(true));
		const {data} = yield call(dashboardApi.fetchSingleActivity, activityId);
		yield put(dashboardActions.fetchSingleActivitySuccess(data.activity));
		yield put(helperActions.setComponentLoading(false));
	} catch (e) {
		yield put(helperActions.setToast({toastType: 'failure', message: 'Something went wrong. Please try again'}));
	}
}

function* fetchSingleActivityWatcher() {
	yield takeEvery(FETCH_SINGLE_ACTIVITY_REQUEST, fetchSingleActivity);
}

function* likeSingleActivity({activityId}) {
	try {
		const {data} = yield call(activityPostsApi.likeActivityAPI, activityId);
		yield put(dashboardActions.likeSingleActivitySuccess(activityId, data.activity_like));
	} catch (e) {
		yield put(helperActions.setToast({toastType: 'failure', message: 'Failed to like activity. Try again!!'}))
	}
}

function* likeSingleActivityWatcher() {
	yield takeEvery(LIKE_SINGLE_ACTIVITY_REQUEST, likeSingleActivity);
}


function* unLikeSingleActivity(action) {
	try {
		yield call(activityPostsApi.unLikeActivityAPI, action);
		yield put(dashboardActions.unLikeSingleActivitySuccess(action.activityId, action.likeId));
	} catch (e) {
		yield put(helperActions.setToast({toastType: 'failure', message: 'Failed to like activity. Try again!!'}))
	}
}

function* unLikeSingleActivityWatcher() {
	yield takeEvery(UN_LIKE_SINGLE_ACTIVITY_REQUEST, unLikeSingleActivity);
}

function* postSingleComment(action) {
  try {
		const {data, error} = yield call(activityPostsApi.postCommentAPI, action);
		if (error === 403) {
			yield put(accountSettingActions.accountUpgradeRequiredRequest({upgrade_required: true}));
		} else {
    		yield put(dashboardActions.postSingleCommentSuccess(action.activityId, data.activity_comment));
    	}
  } catch (e) {
    yield put(helperActions.setToast({toastType: 'failure', message: 'Failed to post comment. Try again!!'}))
  }
}

function* postSingleCommentWatcher() {
  yield takeEvery(POST_SINGLE_COMMENT_REQUEST, postSingleComment);
}

export default [
	fetchNewMembersWatcher,
	fetchAllMembersActivitiesWatcher,
	fetchNexIncompleteProfileItemWatcher,
	updateCurrentUserProfileWatcher,
  	fetchNotificationsWatcher,
	likeActivityWatcher,
	unLikeActivityWatcher,
	postCommentWatcher,
	fetchSingleActivityWatcher,
	likeSingleActivityWatcher,
	unLikeSingleActivityWatcher,
	postSingleCommentWatcher
];
