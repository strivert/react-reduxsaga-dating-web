import { createSelector } from 'reselect';

const selectAccountSettingDomain = (state) => state.get('accountSettings');
const selectAccountSettingsNotificationDomain = (state) => state.getIn(['accountSettings', 'notification']);
const selectAccountSettingsInformationDomain = (state) => state.getIn(['accountSettings', 'contact']);
const selectAccountSettingsProfileDomain = (state) => state.getIn(['accountSettings', 'profile']);
const selectAccountSettingsCredentialsDomain = (state) => state.getIn(['accountSettings', 'credentials']);

const selectAccountSettingsPersonalityTestQuestionsDomain = (state) => state.getIn(['accountSettings', 'personality_test_questions']);
const selectAccountSettingsPersonalityTestResultDomain = (state) => state.getIn(['accountSettings', 'personality_test_result']);
const selectAccountSettingsBlockedUsersDomain = (state) => state.getIn(['accountSettings', 'profile_blocks']);
const selectAccountSettingsPricePlansDomain = (state) => state.getIn(['accountSettings', 'price_plans']);
const selectAccountSettingsUpgradeTokenDomain = (state) => state.getIn(['accountSettings', 'token']);
const selectAccountSettingsStatesDomain = (state) => state.getIn(['accountSettings', 'states']);

const selectAccountSettings = () => createSelector(
  selectAccountSettingDomain,
  (substate) => substate.toJS()
);

const selectAccountSettingsNofication = () => createSelector(
  selectAccountSettingsNotificationDomain,
  (substate) => (substate? substate.toJS(): null)
)

const selectAccountSettingsProfile = () => createSelector(
  selectAccountSettingsProfileDomain,
  (substate) => (substate? substate.toJS(): null)
)

const selectAccountSettingsInformation = () => createSelector(
  selectAccountSettingsInformationDomain,
  (substate) => (substate? substate.toJS(): null)
)

const selectAccountSettingsCredentials = () => createSelector(
  selectAccountSettingsCredentialsDomain,
  (substate) => (substate? substate.toJS(): null)
)

const selectAccountSettingsPersonalityTestQuestions = () => createSelector(
  selectAccountSettingsPersonalityTestQuestionsDomain,
  (substate) => (substate? substate.toJS(): null)
)

const selectAccountSettingsPersonalityTestResult = () => createSelector(
  selectAccountSettingsPersonalityTestResultDomain,
	(substate) => (substate? substate.toJS(): null)
)

const selectAccountSettingsBlockedUsers = () => createSelector(
  selectAccountSettingsBlockedUsersDomain,
  (substate) => (substate? substate.toJS(): null)
)

const selectAccountSettingsPricePlans = () => createSelector(
  selectAccountSettingsPricePlansDomain,
  (substate) => (substate? substate.toJS(): null)
)

const selectAccountSettingsUpgradeToken = () => createSelector(
  selectAccountSettingsUpgradeTokenDomain,
  (substate) => (substate? substate: null)
)

const selectAccountSettingsStates = () => createSelector(
  selectAccountSettingsStatesDomain,
  (substate) => (substate? substate.toJS(): null)
)
export {
  selectAccountSettingDomain,
  selectAccountSettings,
  selectAccountSettingsNofication,
  selectAccountSettingsProfile,
  selectAccountSettingsInformation,
  selectAccountSettingsCredentials,
  selectAccountSettingsPersonalityTestQuestions,
  selectAccountSettingsPersonalityTestResult,
  selectAccountSettingsBlockedUsers,
  selectAccountSettingsPricePlans,
  selectAccountSettingsUpgradeToken,
  selectAccountSettingsStates
}
