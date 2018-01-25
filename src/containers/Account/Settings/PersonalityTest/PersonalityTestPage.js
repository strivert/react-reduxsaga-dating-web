import React, { Component } from "react";
import PropTypes from "prop-types";
import NotificationSystem from "../../../../components/NotificationSystem";
import MultStepForm from './MultiStepForm';
import PersonalityTestResultPage from './PersonalityTestResultPage';
import LocalSpinner from '../../../../components/LocalSpinner';

class PersonalityTestPage extends Component {

  componentDidMount() {
    const {
      personalityTestQuestions,
      setComponentLoadingRequest,
      fetchPersonalityTestQuestionsRequest
    } = this.props;

    if(!personalityTestQuestions) {
      setComponentLoadingRequest(true);
      fetchPersonalityTestQuestionsRequest();
    } else {
      setComponentLoadingRequest(false);
    }
  }

  render() {
    const {
      isLoading,
      notification,
      dismissToaster,
      personalityTestResult,
      personalityTestQuestions,
      submitPersonalityTestRequest
    } = this.props;

    if(personalityTestResult) {
      return <PersonalityTestResultPage result={personalityTestResult}/>
    }

    return (
      <div className="settings__personality">
          <section>
            <h2>Personality Test</h2>
            <p>
              Before we can compare your profile with other members you must first complete the CatholicSingles.com® Compatibility Test.
              It only takes a few minutes so click the 'BEGIN TEST' link below to get started!
            </p>
            <p>
              The Catholic Singles Compatibility Test is a personality survey that can be used to locate more compatible matches.
              The test is divided into two parts which can take as little as 10 minutes. In the first section, you will answer
              partnerQuestions that help to describe who you are and your unique combination of personality factors. In the second section,
              you can tell us the type of factors that you are looking for in a partner. From there, our matching engine identifies those that have complementary traits.
            </p>
            <p>
              There are no "RIGHT" or "WRONG" answers, just choose the answer for what makes sense and best describes you.
              You will only obtain meaningful results if you answer the partnerQuestions seriously. While this test is relatively short,
              it defines broad ranges of compatibility and is meant to identify general guidelines only. You may find that some factors
              describe your personality only some of the time. What this means is that you most likely have the flexibility in your
              personality to be able to adjust your behavior to most circumstances and environments - in other words, you are a
              person for all seasons with different personality factors that express themselves in different ways at different times.
            </p>
            <div>
              <p>
                This test was designed using common attributes that many psychologists consider to be the five fundamental elements of personality but,
                as such, is not a guarantee of compatibility. However, what makes the CatholicsSingles.com® test unique is that it also incorporates
                a measure of religiosity and readiness to commit to your search for a same-faith partner, which is why most of you are members.
                Designed by Michele Fleming, a Catholic marriage and family specialist and relationship expert, this test is the perfect balance
                for members who are looking not only for compatibility in the matters of the heart, but also in matters of faith.
              </p>
            </div>
          </section>
          <NotificationSystem
            notification={notification}
            dismissToaster={dismissToaster}
          />
          <LocalSpinner loaded={!isLoading}>
            <MultStepForm
              personalityTestQuestions={personalityTestQuestions}
              submitPersonalityTestRequest={submitPersonalityTestRequest}
            />
          </LocalSpinner>
      </div>
    );
  }
}

PersonalityTestPage.propTypes = {
  profile: PropTypes.object,
  nofication: PropTypes.shape({
    toastType: PropTypes.string,
    message: PropTypes.string
  }),
  dismissTaoster: PropTypes.func,
  submitPersonalityTestRequest: PropTypes.func.isRequired,
  personalityTestResult: PropTypes.object,
};

export default PersonalityTestPage;
