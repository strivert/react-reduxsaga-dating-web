import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { accountSettingSelectors, helperSelectors } from "../../../../selectors";
import { accountSettingActions, helperActions } from "../../../../actions";
import UpdateCredentialsPage from "./UpdateCredentialsPage";
import LocalSpinner from '../../../../components/LocalSpinner';

class UpdateCredentials extends Component {
  componentDidMount() {
    const {
      fetchUserCredentialsRequest,
      setComponentLoadingRequest,
      credentials,
    } = this.props;

    if (!credentials) {
      setComponentLoadingRequest(true);
	    fetchUserCredentialsRequest();
    } else {
      setComponentLoadingRequest(false);
    }
  }

  render() {
    const {
      credentials,
      updateUserCredentialsRequest,
      dismissToaster,
      notification,
    } = this.props;

    return (
      <LocalSpinner loaded={!!credentials}>
        <UpdateCredentialsPage
          credentials={credentials}
          notification={notification}
          dismissToaster={dismissToaster}
          updateUserCredentialsRequest={updateUserCredentialsRequest}
        />
      </LocalSpinner>
    );
  }
}

UpdateCredentials.propTypes = {
  credentials: PropTypes.shape({
    user_name: PropTypes.string,
    password: PropTypes.string,
  }),
  notification: PropTypes.shape({
    toastType: PropTypes.string,
    message: PropTypes.string,
  }),
  fetchUserCredentialsRequest: PropTypes.func,
  updateUserCredentialsRequest: PropTypes.func,
  dismissToaster: PropTypes.func
};

const mapStateToProps = state => {
  return createStructuredSelector({
    credentials: accountSettingSelectors.selectAccountSettingsCredentials(),
    notification: helperSelectors.selectNotification(),
    // isLoading: helperSelectors.isLoadingSelector() /Disabled for now
  });
};

const mapDispatchToProps = {
  fetchUserCredentialsRequest: accountSettingActions.fetchUserCredentialsRequest,
  updateUserCredentialsRequest: accountSettingActions.updateUserCredentialsRequest,
  setComponentLoadingRequest: helperActions.setComponentLoadingRequest,
  dismissToaster: helperActions.dismissToaster
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCredentials);
