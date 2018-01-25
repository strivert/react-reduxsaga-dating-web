import { call, fork, take, put, all } from "redux-saga/effects";

import { accountSettingApi } from "../../src/remote";
import {
  UPDATE_CONTACT_INFORMATION_REQUEST,
  FETCH_CONTACT_INFORMATION_REQUEST,
  UPDATE_USER_CREDENTIALS_REQUEST,
  FETCH_USER_CREDENTIALS_REQUEST,
  UPDATE_ACCOUNT_PROFILE_REQUEST,
  FETCH_ACCOUNT_PROFILE_REQUEST,
  FETCH_PERSONALITY_TEST_QUESTION_REQUEST,
  SUBMIT_PERSONALITY_TEST_REQUEST,
  FETCH_BLOCKED_USERS_REQUEST,
  CANCEL_ACCOUNT_REQUEST,
  UN_BLOCK_USER_REQUEST,
  BLOCK_USER_REQUEST,
  FETCH_ACCOUNT_UPGRADE_PLANS_REQUEST,
  ACCOUNT_REACTIVATE,
  POST_ACCOUNT_UPGRADE_REQUEST,
  FETCH_STATES_REQUEST,
  AUTH_USER
} from "../actions/types";
import {
 accountSettingActions,
 helperActions,
 authActions
} from "../actions";
import { setToken } from "../utils";

function* fetchAccountProfile() {
  try {
    const { data } = yield call(accountSettingApi.fetchAccountProfileAPI);
    yield put(accountSettingActions.fetchAccountProfileSuccess(data));
    yield put(helperActions.setComponentLoading(false));
  } catch (error) {
    yield put(helperActions.setToast({toastType: 'failure', message: 'Something went wrong. Please try again'}));
  }
}

function* updateAccountProfile({ payload }) {
  try {
    const { data } = yield call(accountSettingApi.updateProfileAPI, payload);
    yield put(accountSettingActions.updateProfileSuccess(data));
    yield put(helperActions.setToast({toastType: 'success', message: `Profile successfully updated`}));
  } catch (error) {
    yield put(helperActions.setToast({toastType: 'failure', message: `Profile update failed`}));
  }
}

function* fetchContactInformation() {
  try {
    const { data } = yield call(accountSettingApi.fetchContactInformationAPI);
    yield put(accountSettingActions.fetchContactInformationSuccess(data));
    yield put(helperActions.setComponentLoading(false));    
  } catch (error) {
    yield put(helperActions.setToast({toastType: 'failure', message: 'Something went wrong. Please try again'}));
  }
}

function* updateContactInformation({ payload }) {
  try {
    const { data } = yield call(accountSettingApi.updateContactInformationAPI, payload);
    yield put(accountSettingActions.updateContactInformationSuccess(data))    
    yield put(helperActions.setToast({toastType: 'success', message: 'Your account information was updated successfully'}));        
  } catch(error) {
    yield put(helperActions.setToast({toastType: 'failure', message: 'Your account information was not updated successfully'}));        
  }
}

function* cancelAccount({ reason }) {
  try {
    yield call(accountSettingApi.cancelAccountAPI, reason);
    yield put(helperActions.setToast({toastType: 'success', message: 'Successfully Cancelled'}));
    yield put(authActions.logoutRequest());
  } catch(error) {
    yield put(helperActions.setToast({toastType: 'failure', message: 'Failed to Cancel'}));
  }
}

function* fetchBlockedUsers() {
  try {
    const { data } = yield call(accountSettingApi.fetchBlockedUsersAPI);
    yield put(accountSettingActions.fetchBlockedUsersSuccess(data));
  } catch (error) {
    yield put(helperActions.setToast({toastType: 'failure', message: 'Could not load blocked users list'}))
  } finally{
    yield put(helperActions.setComponentLoading(false));
  }
}

function* blockUser({ user }) {
  try {
    yield call(accountSettingApi.blockUserAPI, user);
    const { data } = yield call(accountSettingApi.fetchBlockedUsersAPI);
    yield put(accountSettingActions.fetchBlockedUsersSuccess(data));
    yield put(helperActions.setToast({toastType: 'success', message: `User successfully blocked`}));
  } catch(error) {
    yield put(helperActions.setToast({toastType: 'failure', message: `User not was not successfully blocked`}));
  }
}

function* unBlockUser({user_Id}) {
  try {
    yield call(accountSettingApi.unBlockUserAPI, user_Id);
    const { data } = yield call(accountSettingApi.fetchBlockedUsersAPI);
    yield put(accountSettingActions.fetchBlockedUsersSuccess(data));
    yield put(helperActions.setToast({toastType: 'success', message: 'User successfully unblocked'}))
  } catch (error) {
   yield put(helperActions.setToast({toastType: 'failure', message: 'Something went wrong. Unsuccessful'})) 
  }
}

function* fetchUserCredentials() {
  try {
    const { data } = yield call(accountSettingApi.fetchUserCredentialsAPI);
    yield put(accountSettingActions.fetchUserCredentialsSuccess(data));
    yield put(helperActions.setComponentLoading(false));    
  } catch (error) {
    yield put(helperActions.setToast({toastType: 'failure', message: 'Something went wrong. Please try again'}));
  }
}

function* updateUserCredentials({ payload }) {
  try {
    const { data }  = yield call(accountSettingApi.updateUserCredentialsAPI, payload);
    yield put(accountSettingActions.updateUserCredentialsSuccess(data))
    yield put(helperActions.setToast({toastType: 'success', message: 'Your credential was updated successfully'}));        
  } catch(error) {
    yield put(helperActions.setToast({toastType: 'failure', message: 'Your credential was not updated successfully'}));        
  }
}

function* fetchPersonalityTestQuestions() {
  try {
    const { data } = yield call(accountSettingApi.fetchPersonalityTestQuestionsAPI);
    yield put(accountSettingActions.fetchPersonalityTestQuestionsSuccess(data));
    yield put(helperActions.setComponentLoading(false));
  } catch (error) {
    yield put(helperActions.setToast({toastType: 'failure', message: 'Unable to Load questions. Try again'}));
  }
}

function* submitPersonalityTest({ payload }) {
  yield put(helperActions.setComponentLoading(true))
  try {
    yield call(accountSettingApi.submitPersonalityTestAPI, payload);
    const { data } = yield call(accountSettingApi.fetchPersonalityTestResultAPI);
    yield put(accountSettingActions.fetchPersonalityTestResultSuccess(data));
  } catch (error) {
    yield put(helperActions.setToast({toastType: 'failure', message: 'Something went wrong.'}));        
  } finally {
    yield put(helperActions.setComponentLoading(false))
  }
}

function* fetchAccountUpgradePlans() {
    const [pricePlans, upgradeToken] = yield all([
      call(accountSettingApi.fetchAccountUpgradePlansAPI),
      call(accountSettingApi.fetchAccountUpgradeTokenAPI)
    ]);
    yield put(accountSettingActions.fetchAccountUpgradePlansSuccess(pricePlans));
    yield put(accountSettingActions.fetchAccountUpgradeTokenSuccess(upgradeToken));
    yield put(helperActions.setComponentLoading(false));
}

function* updateAccountReactive() {
  try {
    yield call(accountSettingApi.updateAccountReactivateAPI);
    yield put(accountSettingActions.updateUserReactivateSuccess({inactive: false}));
  } catch (error) {
    yield put(helperActions.setToast({toastType: 'failure', message: 'Something went wrong. Please try again'}));
  }
}

function* postAccountUpgrade({payload}) {
  try {
    const { jwt } = yield call(accountSettingApi.postUpgradeAcccountAPI, payload);
    yield put({type: AUTH_USER, jwt});
    setToken(jwt);
    yield put(helperActions.setToast({toastType: 'success', message: 'Your account upgrade was successful'}));
  } catch (error) {
    yield put(helperActions.setToast({toastType: 'failure', message: 'Something went wrong. Ensure you provide valid credentials'}))
  }
}

function* fetchStates({countryId}) {
  const states = yield call(accountSettingApi.fetchStatesAPI, countryId);
  yield put(accountSettingActions.fetchStatesSuccess(states));
}

function* fetchAccountProflleWatcher() {
  while (yield take(FETCH_ACCOUNT_PROFILE_REQUEST)) { // eslint-disable-line no-cond-assign
    yield call(fetchAccountProfile);
  }
}

function* updateProfileWatcher() {
  let action;
  while (action = yield take(UPDATE_ACCOUNT_PROFILE_REQUEST)) { // eslint-disable-line no-cond-assign
    yield call(updateAccountProfile, action);
  }
}

function* fetchContactInformationWatcher() {
  while (yield take(FETCH_CONTACT_INFORMATION_REQUEST)) { // eslint-disable-line no-cond-assign
    yield call(fetchContactInformation);
  }
}

function* updateContactWatcher() {
  let action;
  while (action = yield take(UPDATE_CONTACT_INFORMATION_REQUEST)) { // eslint-disable-line no-cond-assign
    yield call(updateContactInformation, action);
  }
}

function* cancelAccountWatcher() {
  let action;
  while (action = yield take(CANCEL_ACCOUNT_REQUEST)) { // eslint-disable-line no-cond-assign
    yield call(cancelAccount, action);
  }
}

function* fetchBlockedUsersWatcher() {
  while(yield take(FETCH_BLOCKED_USERS_REQUEST)){ // eslint-disable-line no-cond-assign
    yield call(fetchBlockedUsers);
  }
}

function* blockUserWatcher() {
  let action;
  while (action = yield take(BLOCK_USER_REQUEST)){ // eslint-disable-line no-cond-assign
    yield call(blockUser, action);
  }
}

function* unblockUserWatcher() {
  let action;
  while (action = yield take(UN_BLOCK_USER_REQUEST)){ // eslint-disable-line no-cond-assign
    yield call(unBlockUser, action);
  }
}

function* fetchUserCredentialsWatcher() {
  while(yield take(FETCH_USER_CREDENTIALS_REQUEST)) { // eslint-disable-line no-cond-assign
    yield call(fetchUserCredentials);
  }
}

function* updateUserCredentialsWatcher() {
  let action;
  while(action = yield take(UPDATE_USER_CREDENTIALS_REQUEST)) { // eslint-disable-line no-cond-assign
    yield call(updateUserCredentials, action);
  }
}

function* fetchPersonalityTestQuestionsWatcher() {
  while(yield take(FETCH_PERSONALITY_TEST_QUESTION_REQUEST)) { // eslint-disable-line no-cond-assign
    yield call(fetchPersonalityTestQuestions);
  }
}

function* submitPersonalityTestWatcher() {
  let action;
  while(action = yield take(SUBMIT_PERSONALITY_TEST_REQUEST)) { // eslint-disable-line no-cond-assign
    yield call(submitPersonalityTest, action);
  }
}

function* fetchAccountUpgradePlansWatcher() {
  while(yield take(FETCH_ACCOUNT_UPGRADE_PLANS_REQUEST)) { // eslint-disable-line no-cond-assign
    yield call(fetchAccountUpgradePlans);
  }
}

function* updateAccountReactiveWatcher() {
  let action;
  while(action = yield take(ACCOUNT_REACTIVATE)) { // eslint-disable-line no-cond-assign
    yield call(updateAccountReactive, action);
  }
}

function* postAccountUpgradeWatcher() {
  let action;
  while(action = yield take(POST_ACCOUNT_UPGRADE_REQUEST)) { // eslint-disable-line no-cond-assign
    yield call(postAccountUpgrade, action);
  }
}

function* fetchStatesWatcher() {
  let action;
  while(action = yield take(FETCH_STATES_REQUEST)) { // eslint-disable-line no-cond-assign
    yield call(fetchStates, action);
  }
}

export function* accountSettings() {
  yield all([
    fork(fetchAccountProflleWatcher),
    fork(updateProfileWatcher),
    fork(fetchContactInformationWatcher),
    fork(updateContactWatcher),
    fork(cancelAccountWatcher),
    fork(fetchBlockedUsersWatcher),
    fork(blockUserWatcher),
    fork(unblockUserWatcher),
    fork(fetchUserCredentialsWatcher),
    fork(updateUserCredentialsWatcher),
    fork(fetchPersonalityTestQuestionsWatcher),
    fork(submitPersonalityTestWatcher),
    fork(fetchAccountUpgradePlansWatcher),
    fork(updateAccountReactiveWatcher),
    fork(postAccountUpgradeWatcher),
    fork(fetchStatesWatcher)
  ]);
}

export default [accountSettings];
