import { call, all, put, takeEvery } from 'redux-saga/effects';

import {
	memberProfileActions,
	helperActions,
	accountSettingActions,
	viewersFavoriteActions
} from '../actions';

import {
	FETCH_CURRENT_MEMBER_REQUEST,
	MARK_AS_FAVORITE_REQUEST,
	UNMARK_AS_FAVORITE_REQUEST,
	BLOCK_USER, REPORT_USER,
	LIKE_MEMBER_ACTIVITY_REQUEST,
	UN_LIKE_MEMBER_ACTIVITY_REQUEST,
	POST_COMMENT_ON_MEMBER_ACTIVITY_REQUEST,
	SEND_ICE_BREAKER,
	FETCH_DEFAULT_SEARCH_PARAMS_REQUEST
} from '../actions/types';

import { memberProfileApi, accountSettingApi, activityPostsApi } from '../remote';
import { reportPending, reportSuccess, dispatchSuccess } from '../helper/async';

function* fetchCurrentMember({memberId}) {
	const [memberProfile, memberActivity] = yield all([
		call(memberProfileApi.fetchCurrentMemberProfile, memberId),
		call(memberProfileApi.fetchCurrentMemberActivity, memberId)
	]);
	yield put(memberProfileActions.setCurrentMember(memberProfile.profile, memberActivity.activities));
	yield put(helperActions.setComponentLoading(false))
}

function* fetchCurrentMemberWatcher() {
	yield takeEvery(FETCH_CURRENT_MEMBER_REQUEST, fetchCurrentMember);
}

function* markCurrentMemberAsFavorite({memberId}) {
	yield reportPending(MARK_AS_FAVORITE_REQUEST);
	yield call(memberProfileApi.markCurrentMemberAsFavorite, memberId);
	yield dispatchSuccess(MARK_AS_FAVORITE_REQUEST, memberId);
	yield reportSuccess(MARK_AS_FAVORITE_REQUEST);
	yield put(viewersFavoriteActions.fetchProfileRequest('favorites'));
}

function* unmarkCurrentMemberAsFavorite({memberId}) {
	yield reportPending(UNMARK_AS_FAVORITE_REQUEST);
	yield call(memberProfileApi.unmarkCurrentMemberAsFavorite, memberId)
	yield dispatchSuccess(UNMARK_AS_FAVORITE_REQUEST, memberId);
	yield reportSuccess(UNMARK_AS_FAVORITE_REQUEST);
	yield put(viewersFavoriteActions.fetchProfileRequest('favorites'));
}

function* blockUser({memberId}) {
	yield reportPending(BLOCK_USER);
	yield call(memberProfileApi.blockUserAPI, memberId);

	const { data } = yield call(accountSettingApi.fetchBlockedUsersAPI);
	yield put(accountSettingActions.fetchBlockedUsersSuccess(data));

	yield reportSuccess(BLOCK_USER);
}

function* reportUser({payload}) {
	yield reportPending(REPORT_USER);
	yield call(memberProfileApi.reportUserAPI, payload);
	yield reportSuccess(REPORT_USER);
}

function* sendIceBreaker({payload}) {
	yield reportPending(SEND_ICE_BREAKER);
	const {error} = yield call(memberProfileApi.sendIceBreakerAPI, payload);
	if (error === 403) {
		yield put(accountSettingActions.accountUpgradeRequiredRequest({upgrade_required: true}));
	}
	yield reportSuccess(SEND_ICE_BREAKER);
}

function* markCurrentMemberAsFavoriteWatcher() {
	yield takeEvery(MARK_AS_FAVORITE_REQUEST, markCurrentMemberAsFavorite);
}

function* unmarkCurrentMemberAsFavoriteWatcher() {
	yield takeEvery(UNMARK_AS_FAVORITE_REQUEST, unmarkCurrentMemberAsFavorite);
}


function* blockUserWatcher() {
	yield takeEvery(BLOCK_USER, blockUser);
}

function* reportUserWatcher() {
	yield takeEvery(REPORT_USER, reportUser);
}

function* sendIceBreakerWatcher() {
	yield takeEvery(SEND_ICE_BREAKER, sendIceBreaker);
}

function* likeMemberProfileActivity({activityId}) {
	try {
		const {data} = yield call(activityPostsApi.likeActivityAPI, activityId);
		yield put(memberProfileActions.likeMemberActivitySuccess(activityId, data.activity_like))
	} catch (e) {
		yield put(helperActions.setToast({toastType: 'failure', message: 'Something went wrong. Try again!'}))
	}
}

function* unLikeMemberProfileActivity(action) {
	try {
		yield call(activityPostsApi.unLikeActivityAPI, action);
		yield put(memberProfileActions.unLikeMemberActivitySuccess(action.activityId, action.likeId));
	} catch (e) {
		yield put(helperActions.setToast({toastType: 'failure', message: 'Something went wrong. Try again!'}))
	}
}

function* likeMemberProfileActivityWatcher() {
	yield takeEvery(LIKE_MEMBER_ACTIVITY_REQUEST, likeMemberProfileActivity);
}

function* unLikeMemberProfileActivityWatcher() {
	yield takeEvery(UN_LIKE_MEMBER_ACTIVITY_REQUEST, unLikeMemberProfileActivity);
}

function* postCommmentOnMemberActivity(action) {
	try {
		const {data, error} = yield call(activityPostsApi.postCommentAPI, action);
		if (error === 403) {
			yield put(accountSettingActions.accountUpgradeRequiredRequest({upgrade_required: true}));
		} else {
			yield put(memberProfileActions.postCommentOnMemberActivitySuccess(action.activityId, data.activity_comment));
		}
	} catch (e) {
		yield put(helperActions.setToast({toastType: 'failure', message: 'Something went wrong. Try again!'}))
	}
}

function* postCommentOnMemberActivityWatcher() {
	yield takeEvery(POST_COMMENT_ON_MEMBER_ACTIVITY_REQUEST, postCommmentOnMemberActivity);
}

function* fetchDefaultSearchParamsActivity() {
	const params = yield call(memberProfileApi.fetchDefaultSearchParamsAPI);
	yield put(memberProfileActions.setDefaultSearchParams(params.data.search_params));
}

function* fetchDefaultSearchParamsWatcher() {
	yield takeEvery(FETCH_DEFAULT_SEARCH_PARAMS_REQUEST, fetchDefaultSearchParamsActivity);
}

export default [
	fetchCurrentMemberWatcher,
	blockUserWatcher,
	reportUserWatcher,
	markCurrentMemberAsFavoriteWatcher,
	unmarkCurrentMemberAsFavoriteWatcher,
	likeMemberProfileActivityWatcher,
	unLikeMemberProfileActivityWatcher,
	postCommentOnMemberActivityWatcher,
	sendIceBreakerWatcher,
	fetchDefaultSearchParamsWatcher
];
