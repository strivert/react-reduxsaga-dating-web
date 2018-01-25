import axios from 'axios';

import {BASE_URL} from '../helper';

export async function fetchAccountProfileAPI() {
  try {
    const response = await axios.get(`${BASE_URL}/account/profile`);
    return response;
  } catch(e) {
    throw new Error(e);
  }
}

export async function updateProfileAPI(data) {
  try {
    const response = await axios.put(`${BASE_URL}/account/profile`, data );
    return response;
  } catch (e) {
    throw new Error(e)
  }
}

export async function fetchContactInformationAPI() {
  try {
    const response = await axios.get(`${BASE_URL}/account/contact`);
    return response;
  } catch(e) {
    throw new Error(e);
  }
}

export async function updateContactInformationAPI(data) {
  try {
    const response = await axios.put(`${BASE_URL}/account/contact`, data);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export async function cancelAccountAPI(reason) {
  try {
    const response = await axios.post(`${BASE_URL}/account/cancellation`, reason);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export async function fetchBlockedUsersAPI() {
  try {
    const response = await axios.get(`${BASE_URL}/profile_blocks`);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export async function blockUserAPI(user) {
  try {
    const response = await axios.post(`${BASE_URL}/profile_blocks`, user);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export async function unBlockUserAPI(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/profile_blocks/${id}`);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export async function fetchUserCredentialsAPI() {
  try {
    const response = await axios.get(`${BASE_URL}/account/credentials`);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export async function updateUserCredentialsAPI(credential) {
  try {
    const response = await axios.put(`${BASE_URL}/account/credentials`, credential)
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export async function fetchPersonalityTestQuestionsAPI() {
  try {
    const response = await axios.get(`${BASE_URL}/account/personality_test_questions`);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export async function submitPersonalityTestAPI(payload) {
  try {
    const response = await axios.post(`${BASE_URL}/account/personality_test`, payload);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export async function fetchPersonalityTestResultAPI() {
  try {
    const response = await axios.get(`${BASE_URL}/account/personality_test`);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export async function fetchAccountPaymentMethodAPI() {
  try {
    const response = await axios.get(`${BASE_URL}/account/membership_payment_method`);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function updateAccountPaymentMethodAPI(payload) {
  try {
    const response = await axios.put(`${BASE_URL}/account/membership_payment_method`, payload);
    return response.data;
  } catch(e) {
    throw new Error(e);
  }
}

export async function fetchAccountUpgradePlansAPI() {
  try {
    const response = await axios.get(`${BASE_URL}/account/upgrade_plans`);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function updateAccountUpgradePlansAPI(payload) {
  try {
    const response = await axios.put(`${BASE_URL}/account/membership_renewal`, payload);
    return response.data;
  } catch(e) {
    throw new Error(e);
  }
}

export async function fetchAccountUpgradeTokenAPI() {
  try {
    const response = await axios.get(`${BASE_URL}/account/upgrade_token`);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function updateAccountReactivateAPI() {
  try {
    const response = await axios.post(`${BASE_URL}/account/reactivation`);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export async function postUpgradeAcccountAPI(payload) {
  try {
    const response = await axios.post(`${BASE_URL}/account/upgrade`, payload);
    return response.data;
  } catch(e) {
    throw new Error(e);
  }
}

export async function fetchStatesAPI(country_id) {
  try {
    const response = await axios.get(`${BASE_URL}/countries/${country_id}/states`);
    return response.data;
  } catch(e) {
    throw new Error(e);
  }
}
