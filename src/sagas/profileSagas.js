import qs from 'query-string';
import { call, fork, take, put, all } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { profileApi, memberProfileApi } from '../remote';

import { FETCH_PROFILES_REQUEST, SEARCH_PROFILES_REQUEST } from '../actions/types';
import { helperActions, profileActions, memberProfileActions } from '../actions';

// Grab the results of profile search
function* profileResults(profiles) {
  yield put(profileActions.fetchProfileSuccess(profiles));
  yield put(helperActions.setComponentLoading(false));
}

function* fetchProfiles () {
  try {
    yield put(helperActions.setComponentLoading(true));
    const { data } = yield call(profileApi.fetchAllProfilesAPI);

    yield call(profileResults, data);
  } catch (error) {
    yield put(profileActions.fetchProfileFailure(error.message));
  }
}

function* profileSearch({ queryOpts, per, page, isNew }) {
  try {
    if (isNew) {
      yield put(profileActions.setProfileEmpty());
    }
    const { data } = yield call(profileApi.profileSearchAPI, queryOpts, per, page);

    yield call(profileResults, data)
  } catch (error) {
    yield call(profileActions.fetchProfileFailure(error.message));
  } 
}

function* fetchProfilesWatcher() {
  while(yield take(FETCH_PROFILES_REQUEST)) { // eslint-disable-line no-cond-assign
    yield call(fetchProfiles);
  }
}

function* profileSearchWatcher() {
  let action;
  while(action = yield take(SEARCH_PROFILES_REQUEST)) { // eslint-disable-line no-cond-assign
    yield put(helperActions.setComponentLoading(true));
    yield put(memberProfileActions.setDefaultSearchParams(action.queryOpts));
    
    const searchString = qs.stringify(action.queryOpts);
    yield put(push({search: searchString}));
    yield call(profileSearch, action);
    
    try {
      yield call(memberProfileApi.setDefaultSearchParamsAPI, {"profile": action.queryOpts});
    } catch (e) {
      yield put(helperActions.setToast({toastType: 'failure', message: 'Something went wrong. Try again!'}))
    }
  }
}

export function* profile() {
  yield all([
    fork(fetchProfilesWatcher),
    fork(profileSearchWatcher),
  ])
}

export default [
  profile,
]
