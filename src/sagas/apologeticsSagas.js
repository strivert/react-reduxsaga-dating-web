import { put, call, takeEvery } from 'redux-saga/effects';

import {
  FETCH_APOLOGETICS_REQUEST
} from '../actions/types';

import { apologeticsActions } from '../actions';
import { apologeticsApi } from '../remote';


function* fetchAllApologeticsWatcher() {
	yield takeEvery(FETCH_APOLOGETICS_REQUEST, fetchAllApologetics);
}

function* fetchAllApologetics({ payload }) {
	const apologetics = yield call(apologeticsApi.fetchApologetics, payload);
	yield put(apologeticsActions.setApologetics(apologetics));
}

export default [
  fetchAllApologeticsWatcher
];
