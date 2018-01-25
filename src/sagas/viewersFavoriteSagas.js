import { call, fork, take, put, all, select } from "redux-saga/effects";
import React from 'react';
import { viewersFavoriteApi } from "../remote";
import { FETCH_FAVORITE_VIEWER_REQUEST, DELETE_FAVORITE_PROFILE_REQUEST } from "../actions/types";
import {
  helperActions,
  viewersFavoriteActions,
} from "../actions";

function* fetchFavoriteProfiles() {
  try {
    const { data } = yield call(viewersFavoriteApi.fetchFavoriteProfilesAPI);
    yield put(viewersFavoriteActions.fetchFavoriteProfilesSuccess(data.profiles));
  } catch (e) {
    yield put(helperActions.setToast({toastType: 'failure', message: 'Not found'}));
  } finally {
    yield put(helperActions.setComponentLoading(false));    
  }
}

function* fetchViewedProfiles() {
  try {
    const { data } = yield call(viewersFavoriteApi.fetchViewedProfilesAPI);
    yield put(viewersFavoriteActions.fetchViewedProfilesSuccess(data.profiles));
  } catch (e) {
    yield put(helperActions.setToast({toastType: 'failure', message: 'Not found'}));
  } finally {
    yield put(helperActions.setComponentLoading(false));    
  }
}

function* deleteFavoriteProfile({ id }) {
  try {
    const favorties = yield select(state => state.get('viewersFavorite').get('favorites'))
    const user = favorties.find(e => e.get('id') === id)
    yield call(viewersFavoriteApi.deleteFavoriteProfileAPI, id);
    yield put(viewersFavoriteActions.deleteFavoriteProfileSuccess(id))
    yield put(helperActions.setToast({toastType: 'success',
      message: <span><a href={`/profiles/${id}`}>{user.get('user_name')}</a> has been removed from your Favorites.</span>
    }));
  } catch (e) {
    yield put(helperActions.setToast({toastType: 'failure', message: 'Not found'}));
  } finally {
    yield put(helperActions.setComponentLoading(false));
  }
}

function* fetchProfilesWatcher() {
  let action;
  while (action = yield take(FETCH_FAVORITE_VIEWER_REQUEST)) { // eslint-disable-line no-cond-assign
    if (action.category === 'favorites') {
      yield call(fetchFavoriteProfiles);
    } else if (action.category === 'viewers') {
      yield call(fetchViewedProfiles);
    }
  }
}

function* deleteFavoriteProfileWatcher() {
  let action;
  while(action = yield take(DELETE_FAVORITE_PROFILE_REQUEST)) { // eslint-disable-line no-cond-assign
    yield call(deleteFavoriteProfile, action);
  }
}

export function* viewersFavorite() {
  yield all([
    fork(fetchProfilesWatcher),
    fork(deleteFavoriteProfileWatcher),
  ]);
}

export default [
  viewersFavorite,
];
