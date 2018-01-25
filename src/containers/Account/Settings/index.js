import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { routes } from './routes';
import { authSelectors, memberProfilePicturesSelectors } from '../../../selectors';
import defaultAvatar from '../../../uploads/default.jpg';

class AccountSettings extends Component {
  render() {
    const { currentUser, mainPicture } = this.props;
    let avatar = mainPicture ? mainPicture.large_url: defaultAvatar;
    if (mainPicture && !mainPicture.small_url.startsWith('https://')) {
      avatar = defaultAvatar
    }

    return (
      <div className="settings">
        <div className="settings__aside">
          <div className="settings__avatar">
            <img src={avatar} alt="Profile avatar" />
            <Link to="/manage-pictures">
              <span>
                <i className="fa fa-pencil" />
              </span>
            </Link>
          </div>
          <ul className="settings__options">
            <li>
              <Link to={`/profiles/${(currentUser && currentUser.user_id) || ''}`}>Preview My profile</Link>
            </li>
            <li>
              <Link to="/account/payment_method">Payment Method</Link>
            </li>
            <li>
              <Link to="/account/subscription_plan">Subscription Plan</Link>
            </li>
            <li>
              <Link to="/account/contact">Your Contact Information</Link>
            </li>
            <li>
              <Link to="/account/change">Change username/password</Link>
            </li>
            <li>
              <Link to="/account/cancel">Cancel Account</Link>
            </li>
            {/*
              <li>
                <Link to="/account/personality_test">Compatibility Test</Link>
              </li>
            */}
            <li>
              <Link to="/account/block_user">Blocked Users</Link>
            </li>
            <li>
              <Link to="/account/help">Help</Link>
            </li>
          </ul>
        </div>
        <div className="settings__main">
          {routes.map((route, key) => (
            <Route
              key={key}
              path={route.path}
              render={props => <route.component {...props} />}
              exact={route.exact}
            />
          ))}
        </div>
      </div>
    );
  }
}

AccountSettings.propTypes = {
  currentUser: PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    user_name: PropTypes.string.isRequired
  })
};

const mapStateToProps = (state) => {
  return createStructuredSelector({
    currentUser: authSelectors.selectCurrentUser(),
    mainPicture: memberProfilePicturesSelectors.currentUserMainProfilePictureSelector()
  })
}

export default connect(mapStateToProps)(AccountSettings);
