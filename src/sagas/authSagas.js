import { takeLatest, put, call } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import { authActions, helperActions } from '../actions';
import { LOGIN_REQUEST, LOGOUT_REQUEST } from '../actions/types';
import { authApi } from '../remote';
import { setToken, clearToken } from '../utils';


function* loginUser({ auth }) {
  try {
    const { data } = yield call(authApi.loginRequestAPI, auth);
    if(data['jwt']) {
      yield put(authActions.loginSuccess(data['jwt']));
      setToken(data['jwt']);
      window.location.href = '/';
    } else {
      yield put(helperActions.setToast({toastType: 'failure', message: 'User not found'}));
    }
  } catch (e) {
    yield put(helperActions.setToast({toastType: 'failure', message: 'User not found'}));
  }
}

function* logoutUser() {
  yield call(authApi.logout);
  yield call(clearToken);
  yield put(replace('/login'));
  yield put(authActions.logoutSuccess());
}

function* loginRequestWatcher() {
  yield takeLatest(LOGIN_REQUEST, loginUser) // eslint-disable-line no-cond-assign
}

function* logoutUserRequestWatcher() {
	yield takeLatest(LOGOUT_REQUEST, logoutUser);
}

export default [
  loginRequestWatcher,
	logoutUserRequestWatcher
]
