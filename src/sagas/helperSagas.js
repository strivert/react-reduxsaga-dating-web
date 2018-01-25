import { takeEvery, put } from 'redux-saga/effects';

import {
	SET_COMPONENT_LOADING_REQUEST
} from '../actions/types'

import { helperActions } from '../actions';

function* setComponentLoading({isLoading}) {
	yield put(helperActions.setComponentLoading(isLoading));
}

function* setComponentLoadingWatcher() {
	yield takeEvery(SET_COMPONENT_LOADING_REQUEST, setComponentLoading);
}

export default [
	setComponentLoadingWatcher
];