import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PersonalityTestPage from './PersonalityTestPage';
import { helperSelectors, accountSettingSelectors } from '../../../../selectors';
import { helperActions, accountSettingActions } from '../../../../actions';

class PersonalityTest extends Component {
  render() {
    const { 
      isLoading,
      notification, 
      dismissToaster, 
      personalityTestResult,
      personalityTestQuestions, 
      setComponentLoadingRequest,
      submitPersonalityTestRequest,
      fetchPersonalityTestQuestionsRequest, 
    } = this.props;
    return (
      <PersonalityTestPage
        personalityTestQuestions={personalityTestQuestions}
        personalityTestResult={personalityTestResult}
        notification={notification}
        isLoading={isLoading}
        dismissToaster={dismissToaster}
        fetchPersonalityTestQuestionsRequest={fetchPersonalityTestQuestionsRequest}
        submitPersonalityTestRequest={submitPersonalityTestRequest}
        setComponentLoadingRequest={setComponentLoadingRequest}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return createStructuredSelector({
    personalityTestQuestions: accountSettingSelectors.selectAccountSettingsPersonalityTestQuestions(),
    personalityTestResult: accountSettingSelectors.selectAccountSettingsPersonalityTestResult(),
    notification: helperSelectors.selectNotification(),
    isLoading: helperSelectors.isLoadingSelector(),
  })
}

const mapDispatchToProps = {
  submitPersonalityTestRequest: accountSettingActions.submitPersonalityTestRequest,
  fetchPersonalityTestQuestionsRequest: accountSettingActions.fetchPersonalityTestQuestionsRequest,
  setComponentLoadingRequest: helperActions.setComponentLoadingRequest,
  dismissToaster: helperActions.dismissToaster,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalityTest);
