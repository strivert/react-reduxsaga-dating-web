import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import NotificationSystem from '../../../../components/NotificationSystem';
import { accountSettingActions, helperActions } from '../../../../actions';
import { helperSelectors, accountSettingSelectors } from '../../../../selectors';
import LocalSpinner from '../../../../components/LocalSpinner';

class BlockedUsers extends Component {
  state = {
    user_name: '',
  };

  componentDidMount() {
    const {
      blockedUsers,
      setComponentLoadingRequest,
      fetchBlockedUsersRequest
    } = this.props;

    if(!blockedUsers) {
      setComponentLoadingRequest(true);
      fetchBlockedUsersRequest();
    } else {
      setComponentLoadingRequest(false);
    }
  }

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({user_name:  {...this.state, [name]: value }});
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.blockUserRequest({profile_block: this.state.user_name});
  };

  unBlockUser = (id) => {
    this.props.unblockUserRequest(id)
  }

  renderBlockedUsers() {
    const {blockedUsers} = this.props;
    return blockedUsers.map(user => (
      <li className="user__list" key={user.blocked_user_id}>
        <p className="username">{user.blocked_user_name}</p>
        <button className="remove" onClick={() => this.unBlockUser(user.blocked_user_id)}>Unblock user</button>
      </li>
    ))
  }

  render() {
    const {
      notification,
      dismissToaster,
      blockedUsers,
      isLoading
    } = this.props;

    return (
      <div className="settings__blocked__user">
        <NotificationSystem notification={notification} dismissToaster={dismissToaster} />
        <h3>Manage Blocked User</h3>
        <hr />
        <LocalSpinner loaded={!isLoading}>
          <h4>Add New Blocked User</h4>
          <form onSubmit={this.handleSubmit}>
            <div className="block__user__form">
              <TextInput
                name="user_name"
                type="text"
                placeholder="Add username"
                onChange={this.handleOnChange}
                />
              <Button className="block__user-btn" type="submit">Add User to Block List</Button>
            </div>
          </form>
          <section>
            <h4>Existing Blocked Users</h4>
          </section>
          <ul className="blocked__users">
            {blockedUsers && this.renderBlockedUsers()}
          </ul>
        </LocalSpinner>
      </div>
    );
  }
}

BlockedUsers.propTypes = {
  notification: PropTypes.shape({
    toastType: PropTypes.string,
    message: PropTypes.string,
  }),
  blockedUsers: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  blockUserRequest: PropTypes.func,
  dismissToaster: PropTypes.func,
  fetchBlockedUsersRequest: PropTypes.func,
  setComponentLoadingRequest: PropTypes.func,
  unblockUserRequest: PropTypes.func,
};

const mapStateToProps = (state) => {
  return createStructuredSelector({
    notification: helperSelectors.selectNotification(),
    blockedUsers: accountSettingSelectors.selectAccountSettingsBlockedUsers(),
    isLoading: helperSelectors.isLoadingSelector()
  })
}

const mapDispatchToProp  = {
  blockUserRequest: accountSettingActions.blockUserRequest,
  dismissToaster: helperActions.dismissToaster,
  fetchBlockedUsersRequest: accountSettingActions.fetchBlockedUsersRequest,
  unblockUserRequest: accountSettingActions.unblockUserRequest,
  setComponentLoadingRequest: helperActions.setComponentLoadingRequest,
}

export default connect(mapStateToProps, mapDispatchToProp)(BlockedUsers);
