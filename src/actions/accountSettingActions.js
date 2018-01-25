import {
  FETCH_ACCOUNT_PROFILE_REQUEST,
  FETCH_ACCOUNT_PROFILE_SUCCESS,
  UPDATE_ACCOUNT_PROFILE_REQUEST,
  UPDATE_ACCOUNT_PROFILE_SUCCESS,
  FETCH_CONTACT_INFORMATION_REQUEST,
  FETCH_CONTACT_INFORMATION_SUCCESS,
  UPDATE_CONTACT_INFORMATION_REQUEST,
  UPDATE_CONTACT_INFORMATION_SUCCESS,
  UPDATE_USER_CREDENTIALS_SUCCESS,
  FETCH_USER_CREDENTIALS_REQUEST,
  FETCH_USER_CREDENTIALS_SUCCESS,
  UPDATE_USER_CREDENTIALS_REQUEST,
  CANCEL_ACCOUNT_REQUEST,
  BLOCK_USER_REQUEST,
  FETCH_PERSONALITY_TEST_QUESTION_REQUEST,
  FETCH_PERSONALITY_TEST_QUESTION_SUCCESS,
  SUBMIT_PERSONALITY_TEST_REQUEST,
  FETCH_PERSONALITY_TEST_RESULT_SUCCESS,
  FETCH_BLOCKED_USERS_REQUEST,
  FETCH_BLOCKED_USERS_SUCCESS,
  UN_BLOCK_USER_REQUEST,
  FETCH_ACCOUNT_UPGRADE_PLANS_REQUEST,
  FETCH_ACCOUNT_UPGRADE_PLANS_SUCCESS,
  FETCH_ACCOUNT_UPGRADE_TOKEN_SUCCESS,
  FETCH_ACCOUNT_PAYMENT_METHOD_REQUEST,
  FETCH_ACCOUNT_PAYMENT_METHOD_SUCCESS,
  UPDATE_ACCOUNT_PAYMENT_METHOD_REQUEST,
  UPDATE_ACCOUNT_PAYMENT_METHOD_SUCCESS,
  ACCOUNT_INACTIVE,
  ACCOUNT_REACTIVATE,
  ACCOUNT_REACTIVATE_SUCCESS,
  POST_ACCOUNT_UPGRADE_REQUEST,
  POST_ACCOUNT_UPGRADE_SUCCESS,
  FETCH_STATES_REQUEST,
  FETCH_STATES_SUCCESS,
  ACCOUNT_UPGRADE_REQUIRED_REQUEST
} from "./types";

export const fetchAccountProfileRequest = () => ({
  type: FETCH_ACCOUNT_PROFILE_REQUEST
});

export const fetchAccountProfileSuccess = (payload) => ({
  type: FETCH_ACCOUNT_PROFILE_SUCCESS,
  payload
});

export const updateProfileRequest = (payload) => ({
  type: UPDATE_ACCOUNT_PROFILE_REQUEST,
  payload,
});

export const updateProfileSuccess = (payload) => ({
  type: UPDATE_ACCOUNT_PROFILE_SUCCESS,
  payload,
})

export const fetchContactInformationRequest = () => ({
  type: FETCH_CONTACT_INFORMATION_REQUEST
});

export const fetchContactInformationSuccess = (payload) => ({
  type: FETCH_CONTACT_INFORMATION_SUCCESS,
  payload
});

export const updateContactInformationRequest = (payload) => ({
  type: UPDATE_CONTACT_INFORMATION_REQUEST,
  payload
});

export const updateContactInformationSuccess = (payload) => ({
  type: UPDATE_CONTACT_INFORMATION_SUCCESS,
  payload
});


export const cancelAccountRequest = (reason) => ({
  type: CANCEL_ACCOUNT_REQUEST,
  reason
});

export const blockUserRequest = (user) => ({
  type: BLOCK_USER_REQUEST,
  user
});

export const fetchBlockedUsersRequest = () => ({
  type: FETCH_BLOCKED_USERS_REQUEST
});

export const fetchBlockedUsersSuccess = (payload) => ({
  type: FETCH_BLOCKED_USERS_SUCCESS,
  payload
});

export const unblockUserRequest= (user_Id) => ({
  type: UN_BLOCK_USER_REQUEST,
  user_Id
});

export const fetchUserCredentialsRequest = () => ({
  type: FETCH_USER_CREDENTIALS_REQUEST
});

export const fetchUserCredentialsSuccess = (payload) => ({
  type: FETCH_USER_CREDENTIALS_SUCCESS,
  payload
});

export const updateUserCredentialsRequest = (payload) => ({
  type: UPDATE_USER_CREDENTIALS_REQUEST,
  payload
});

export const updateUserCredentialsSuccess = (payload) => ({
  type: UPDATE_USER_CREDENTIALS_SUCCESS,
  payload
});

export const fetchPersonalityTestQuestionsRequest = () => ({
  type: FETCH_PERSONALITY_TEST_QUESTION_REQUEST
});

export const fetchPersonalityTestQuestionsSuccess = (payload) => ({
  type: FETCH_PERSONALITY_TEST_QUESTION_SUCCESS,
  payload
});

export const fetchPersonalityTestResultSuccess = (payload) => ({
  type: FETCH_PERSONALITY_TEST_RESULT_SUCCESS,
  payload
});

export const submitPersonalityTestRequest = (payload) => ({
  type: SUBMIT_PERSONALITY_TEST_REQUEST,
  payload
});

export const fetchAccountUpgradePlansRequest = () => ({
  type: FETCH_ACCOUNT_UPGRADE_PLANS_REQUEST
});

export const fetchAccountUpgradePlansSuccess = (payload) => ({
  type: FETCH_ACCOUNT_UPGRADE_PLANS_SUCCESS,
  payload
});

export const fetchAccountUpgradeTokenSuccess = (payload) => ({
  type: FETCH_ACCOUNT_UPGRADE_TOKEN_SUCCESS,
  payload
});

export const fetchAccountPaymentMethodRequest = () => ({
  type: FETCH_ACCOUNT_PAYMENT_METHOD_REQUEST
});

export const fetchAccountPaymentMethodRequestSuccess = (payload) => ({
  type: FETCH_ACCOUNT_PAYMENT_METHOD_SUCCESS,
  payload
});

export const updateAccountPaymentMethodRequest = (payload) => ({
  type: UPDATE_ACCOUNT_PAYMENT_METHOD_REQUEST,
  payload
});

export const updateAccounPaymentMethodSuccess = (payload) => ({
  type: UPDATE_ACCOUNT_PAYMENT_METHOD_SUCCESS,
  payload
});

export const accountInActive = (payload) => ({
  type: ACCOUNT_INACTIVE,
  payload
});

export const updateUserReactivateSuccess = (payload) => ({
  type: ACCOUNT_REACTIVATE_SUCCESS,
  payload
});

export const updateUserReactivate = (payload) => ({
  type: ACCOUNT_REACTIVATE,
  payload
});

export const postAccountUpgradeRequest = (payload) => ({
  type: POST_ACCOUNT_UPGRADE_REQUEST,
  payload
});

export const postAccountUpgradeSuccess = (payload) => ({
  type: POST_ACCOUNT_UPGRADE_SUCCESS,
  payload
});

export const fetchStatesRequest = (countryId) => ({
  type: FETCH_STATES_REQUEST,
  countryId
});

export const fetchStatesSuccess = (payload) => ({
  type: FETCH_STATES_SUCCESS,
  payload
});

export const accountUpgradeRequiredRequest = (payload) => ({
  type: ACCOUNT_UPGRADE_REQUIRED_REQUEST,
  payload
});