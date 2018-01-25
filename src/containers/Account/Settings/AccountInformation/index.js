import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { accountSettingSelectors, helperSelectors, authSelectors } from '../../../../selectors';
import { accountSettingActions, helperActions } from '../../../../actions';
import AccountInformationPage from './AccountInformationPage';
import LocalSpinner from '../../../../components/LocalSpinner';

class AccountInformation extends Component {
  componentDidMount() {
    const {
      fetchContactInformationRequest,
      setComponentLoadingRequest,
      contact,
    } = this.props;

    if (!contact) {
      setComponentLoadingRequest(true);
	    fetchContactInformationRequest();
    } else {
      setComponentLoadingRequest(false);
    }
  }

  render() {
    const {
      contact,
      updateContactInformationRequest,
      dismissToaster,
      notification,
      isLoading,
      currentUser
    } = this.props;

    return (
      <LocalSpinner loaded={!isLoading}>
        <AccountInformationPage
          contact={contact}
          notification={notification}
          dismissToaster={dismissToaster}
          currentUser={currentUser}
          updateContactInformationRequest={updateContactInformationRequest}
        />
      </LocalSpinner>
    );
  }
}

AccountInformation.propTypes = {
  account: PropTypes.object,
  currentUser: PropTypes.shape({
    show_states: PropTypes.bool,
    show_zipcodes: PropTypes.bool
  })
};

const mapStateToProps = state => {
  return createStructuredSelector({
    contact: accountSettingSelectors.selectAccountSettingsInformation(),
    notification: helperSelectors.selectNotification(),
    isLoading: helperSelectors.isLoadingSelector(),
    currentUser: authSelectors.selectCurrentUser()
  });
};

const mapDispatchToProps = {
  fetchContactInformationRequest: accountSettingActions.fetchContactInformationRequest,
  updateContactInformationRequest: accountSettingActions.updateContactInformationRequest,
  setComponentLoadingRequest: helperActions.setComponentLoadingRequest,
  dismissToaster: helperActions.dismissToaster,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountInformation);
