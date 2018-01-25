import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { authSelectors, accountSettingSelectors } from '../../selectors';

export default (WrappedComponent) => {
  class Authorize extends Component {
  
    componentWillMount() {
      if(!this.props.auth.currentUser) {
        this.props.dispatch(push('/login'));
      }
    }

    componentWillReceiveProps(nextProps) {
      if(!this.props.accountSettings.inactive && nextProps.accountSettings.inactive) {
        this.props.dispatch(push('/reactivate'));
      }
      if(this.props.accountSettings.inactive && !nextProps.accountSettings.inactive) {
        if(this.props.auth.currentUser) {
          this.props.dispatch(push('/account-upgrade'));
        } else {
          this.props.dispatch(push('/'));
        }
      }
      if(!this.props.accountSettings.upgrade_required && nextProps.accountSettings.upgrade_required) {
        this.props.dispatch(push('/account-upgrade'));
      }
    }

    render () {
      const newProps = {
        authenticated: !!this.props.auth.currentUser
      }
      
      return (
        <WrappedComponent {...this.props} {...newProps} />
      );
    }
  }

  const mapStateToProps = (state) => {
    return createStructuredSelector({
      auth: authSelectors.selectAuth(),
      accountSettings: accountSettingSelectors.selectAccountSettings()
    })
  }

  return connect(mapStateToProps)(Authorize);
}
