import { takeEvery, put, call } from 'redux-saga/effects';

import {
	FETCH_PROFILE_PICTURES_REQUEST,
	UPLOAD_PROFILE_PICTURE_REQUEST
} from '../actions/types';
import { memberProfilePicturesActions, helperActions, accountSettingActions } from '../actions';
import { memberProfilePicturesApi } from '../remote';

function* fetchCurrentUserPictures() {
	const {photos, error} = yield call(memberProfilePicturesApi.fetchCurrentUserProfilePictures);
	if (error === 403) {
		yield put(accountSettingActions.accountInActive({inactive: true}));
	} else {
		yield put(memberProfilePicturesActions.setCurrentUserProfilePictures(photos));
	}
}

function* uploadCurrentUserProfilePicture({ data, mainPicId }) {
	yield put(helperActions.setComponentLoadingRequest(true));
	yield call(memberProfilePicturesApi.uploadProfilePicture, data);
	if (mainPicId) {
		yield call(memberProfilePicturesApi.deleteProfilePicture, mainPicId);
	}
	yield call(fetchCurrentUserPictures);	
	yield put(helperActions.setComponentLoadingRequest(false));
}

function* uploadCurrentUserProfilePictureRequestWatcher() {
	yield takeEvery(UPLOAD_PROFILE_PICTURE_REQUEST, uploadCurrentUserProfilePicture)
}

function* fetchCurrentUserPicturesRequestWatcher() {
	yield takeEvery(FETCH_PROFILE_PICTURES_REQUEST, fetchCurrentUserPictures);
}

export default [
	fetchCurrentUserPicturesRequestWatcher,
	uploadCurrentUserProfilePictureRequestWatcher,
];
