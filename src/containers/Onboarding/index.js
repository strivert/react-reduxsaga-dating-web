import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import { routes } from './routes';
import { extractFieldValues } from "../../utils";
import ProgressBar from '../../components/ProgressBar';

import { accountSettingSelectors, helperSelectors, authSelectors } from '../../selectors';
import { accountSettingActions, helperActions } from '../../actions';
import LocalSpinner from '../../components/LocalSpinner';
import logo from '../../static/images/CatholicSingles.png';
// import defaultAvatar from '../../../uploads/default.jpg';
 const mustIncludeRoutes = ['hair_color', 'eye_color', 'date_with_children']
class Onboarding extends Component {
  constructor(props) {
    super(props);

    const profileData = extractFieldValues(props.profile)
    const profile = props.profile
    //we need to filer routes that don't have field set
    const unsetRoutes = routes.filter(route => {
      // check if data is set
      if (route.field === 'hobbies') {
        return (profile && profile.hobbies.values.length === 0) || mustIncludeRoutes.includes(route.field)
      } else if (route.field === 'photo') {
        return (profile && !profile.primary_photo) || mustIncludeRoutes.includes(route.field)
      } else {
        return !route.field || !profileData[route.field] || mustIncludeRoutes.includes(route.field)
      }
    })

    this.state = {
      profileData: profileData,
      unsetRoutes: unsetRoutes,
    };

  }

  componentWillReceiveProps(nextProps) {
    const profileData = extractFieldValues(nextProps.profile)
    const profile = nextProps.profile
    //we need to filer routes that don't have field set
    const unsetRoutes = routes.filter(route => {
      // check if data is set
      if (route.field === 'hobbies') {
        return (profile && profile.hobbies.values.length === 0) || mustIncludeRoutes.includes(route.field)
      } else if (route.field === 'photo') {
        return (profile && !profile.primary_photo) || mustIncludeRoutes.includes(route.field)
      } else {
        return !route.field || !profileData[route.field] || mustIncludeRoutes.includes(route.field)
      }
    })

    this.state = {
      profileData: profileData,
      unsetRoutes: unsetRoutes,
    };
    this.setState({
      profileData: extractFieldValues(nextProps.profile)
    });
  }

  componentDidMount() {
    const {
      setComponentLoadingRequest,
      fetchAccountProfileRequest,
      profile
    } = this.props;

    if(!profile) {
      setComponentLoadingRequest(true);
      fetchAccountProfileRequest();
    } else {
      setComponentLoadingRequest(false);
    }
  }

  handleOnChange = ({ target: { name, value } }, cb) => {
    this.setState({
      profileData: { ...this.state.profileData, [name]: value }
    }, cb);
  }

  handleChangeHobbies = (hobbies, cb) => {
    this.setState({
      profileData: { ...this.state.profileData, ['hobbies']: hobbies }
    }, cb);
  }

  toggleLoginStatusVisibility = ({ target: { name } }) => {
    this.setState({
      profileData: {
        ...this.state.profileData,
        [name]: !this.state.profileData[name]
      }
    })
  }

  cbUpdateState(nextState) {
    this.handleOnSubmit()
  }

  handleOnSubmit = (newState) => {
    this.props.updateProfileRequest({ profile: this.state.profileData });
  }

  goNext (name, value, current) {
    const { unsetRoutes } = this.state
    const idx = _.findIndex(unsetRoutes, r => r.path === current);
    if (name && value) {
      this.handleOnChange({target: {name, value}}, this.cbUpdateState);
    }

    if (idx !== -1 && idx !== unsetRoutes.length - 1) { // if it's last
      this.props.history.push(unsetRoutes[idx+1].path);
    } else {
      this.props.history.push('/account-upgrade');
    }
  }

  goPrev (current) {
    const { unsetRoutes } = this.state
    const idx = _.findIndex(unsetRoutes, r => r.path === current);

    if (idx !== -1 && idx !== 0) { // if it's last
      this.props.history.push(unsetRoutes[idx-1].path);
    }
  }

  goToUpgradeAccount(hobbies) {
    this.handleChangeHobbies(hobbies, this.cbUpdateState);
    this.props.history.push('/account-upgrade');
  }

  render () {
    const {
      location,
      profile,
      isLoading,
      notification,
      currentUser,
      dismissToaster,
      updateProfileRequest,
    } = this.props;

    const {
      profileData,
      unsetRoutes
    } = this.state;

    const current = _.findIndex(unsetRoutes, r => r.path === location.pathname ) + 1;
    return (
      <LocalSpinner loaded={!isLoading}>
        <div className="onboarding-container">
          <div className="onboarding-header">
            <Link to='/'><img src={logo} alt="CatholicSingles" className="logo" /></Link>
          </div>
          <ProgressBar current={current} total={unsetRoutes.length} />
          {unsetRoutes.map((route, key) => {
            const currentPath = route.path;

            return (
              <Route
                key={key}
                path={route.path}
                render={props =>
                  <route.component
                    goNext={(name, value, current) => this.goNext(name, value, current)}
                    goPrev={() => this.goPrev(route.path)}
                    goToUpgradeAccount={(hobbies) => this.goToUpgradeAccount(hobbies)}
                    updateProfileRequest={updateProfileRequest}
                    handleOnChange={this.handleOnChange}
                    profile={profile}
                    profileData={profileData}
                    notification={notification}
                    dismissToaster={dismissToaster}
                    currentUser={currentUser}
                    currentPath={currentPath}
                    {...props}
                  />
                }
                exact={route.exact}
              />
            )
          })}
        </div>
      </LocalSpinner>
    );
  }
}

Onboarding.propTypes = {
  /*
  currentUser: PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    user_name: PropTypes.string.isRequired
  }), */
  profile: PropTypes.object,
  notificaton: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string
  }),
  fetchAccountProfileRequest: PropTypes.func,
  updateProfileRequest: PropTypes.func,
  dismissToaster: PropTypes.func,
  currentUser: PropTypes.shape({
    show_states: PropTypes.bool,
    show_zipcodes: PropTypes.bool
  })
};

const mapStateToProps = state => {
  return createStructuredSelector({
    profile: accountSettingSelectors.selectAccountSettingsProfile(),
    notification: helperSelectors.selectNotification(),
    isLoading: helperSelectors.isLoadingSelector(),
    currentUser: authSelectors.selectCurrentUser()
  });
};

const mapDispatchToProps = {
  fetchAccountProfileRequest: accountSettingActions.fetchAccountProfileRequest,
  updateProfileRequest: accountSettingActions.updateProfileRequest,
  dismissToaster: helperActions.dismissToaster,
  setComponentLoadingRequest: helperActions.setComponentLoadingRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
