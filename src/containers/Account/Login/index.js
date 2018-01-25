import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { authActions, helperActions } from '../../../actions';
import { authSelectors, helperSelectors } from '../../../selectors';
import LoginForm from './LoginForm';

class Login extends Component {
  state = {
    auth: { email: '', password: '' },
  };

  componentWillMount() {
  if(!!this.props.auth.token) {
      this.props.history.push('/');
    }
  }

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ auth: { ...this.state.auth, [name]: value } });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    this.props.loginRequest(this.state.auth);
  };

  render() {
    const { notification, dismissToaster } = this.props; // You can grab anything from these splice of the store here

    return (
      <LoginForm
        value={this.state.auth}
        buttonLabel="Sign In"
        handleOnChange={this.handleOnChange}
        handleOnSubmit={this.handleOnSubmit}
        dismissToaster={dismissToaster}
        notification={notification}
      />
    );
  }
}

const mapStateToProps = state => {
  return createStructuredSelector({
    auth: authSelectors.selectAuth(),
    notification: helperSelectors.selectNotification()
  })
};

const mapDispatchToProps = {
  loginRequest: authActions.loginRequest,
  dismissToaster: helperActions.dismissToaster
}

export default connect(mapStateToProps,  mapDispatchToProps)(Login);
