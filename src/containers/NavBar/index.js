import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { setToken } from '../../utils';

import Button from '../../components/Button';
import Login from '../../containers/Account/Login/';
import { memberProfilePicturesActions, authActions, notificationsActions } from '../../actions'
import { memberProfilePicturesSelectors, notificationsSelectors, authSelectors, accountSettingSelectors } from '../../selectors'
import dashboardIcon from '../../static/images/nav-dashboard.svg'
import browseIcon from '../../static/images/nav-browse.svg'
import messagesIcon from '../../static/images/nav-messages.svg'
import favoritesIcon from '../../static/images/nav-favorites.svg'
import activitiesIcon from '../../static/images/nav-activities.svg'
import accountIcon from '../../static/images/nav-account.svg'

import logo from '../../static/images/CatholicSingles.png';
import defaultAvatar from '../../uploads/default.jpg';

class NavBar extends Component {
  state = {
    trigger: false,
  	hideMobileMenu: true,
  	unreadCount: 0
  };
  handleOnClick = (e) => this.setState({ trigger: !this.state.trigger });

	toggleMenu() {
		this.setState({ hideMobileMenu: !this.state.hideMobileMenu });
	}

	logout() {
		setToken('');
		this.props.logoutRequest();
	}

	componentDidMount() {
		const { authenticated, mainPicture, fetchCurrentUserProfilePicture } = this.props;

		if (authenticated && !mainPicture) {
			fetchCurrentUserProfilePicture()
		}
	}

	componentWillReceiveProps(nextProps) {
		let unreadCount = 0;
		nextProps.userNotifications.map((item, index)=>{
			if (item.kind === 'new_messages' ) {
				unreadCount = item.count;
			}
			return true;
		});
		this.setState({
			unreadCount: unreadCount
		});
	}

	renderMenu() {
		const { authenticated, currentUser, accountSettings } = this.props;
		const { pathname } = this.props.location;
		const { inactive } = accountSettings;
		const popOver = this.state.trigger ? <Login />: null;

		const {unreadCount} = this.state;

  	if (!authenticated) {
			return (
				<div>
					<span>Already have an account?</span>
					<Button
						type="text"
						value="Sign In"
						handleOnClick={this.handleOnClick}
						className="button-login"
					/>
					{popOver}
				</div>
			);
	  } else {
  		const { mainPicture } = this.props;
  		let avatar = mainPicture ? mainPicture.small_url: defaultAvatar;

  		if (mainPicture && !mainPicture.small_url.startsWith('https://')) {
  			avatar = defaultAvatar
		  }

  		return (
			  <div className="header__menu">
          <div className="header__menu__sign-out">
            { (currentUser.limited && !inactive) && <div className="header__menu__upgrade__btn">
              <Link to="/account-upgrade">Upgrade</Link>
            </div> }
					  <div className="header__menu__sign-out__btn">
						  <img src={avatar} alt=""/>
						  <Link onClick={this.logout.bind(this)} to="">Sign out</Link>
					  </div>
				  </div>
				  {
					!inactive &&
					<div className="header__menu__items">
						<ul>
							<li>
								<img src={dashboardIcon} alt="Dashboard" className="menu-icon" />
								<Link to="/" className={classNames({'active' : pathname === '/'})}>Dashboard</Link>
							</li>
							<li>
								<img src={browseIcon} alt="Browse" className="menu-icon" />
								<Link to="/profiles" className={classNames({'active' : pathname.startsWith('/profiles')})}>Browse Matches</Link>
							</li>
							<li>
								<img src={messagesIcon} alt="Messages" className="menu-icon" />
								<Link to="/messages" className={classNames({'active' : pathname === '/messages'})}>Messages</Link>
								{ unreadCount > 0 && <span className="count">{unreadCount}</span> }
							</li>
							<li>
								<img src={favoritesIcon} alt="Favorites" className="menu-icon" />
								<Link to="/favorites" className={classNames({'active' : pathname === '/favorites'})}>Favorites</Link>
							</li>
							<li>
								<img src={activitiesIcon} alt="Activities" className="menu-icon" />
								<Link to="/apologetics" className={classNames({'active' : pathname.startsWith('/apologetics')})}>Activities</Link>
							</li>
							<li>
								<img src={accountIcon} alt="Account" className="menu-icon" />
								<Link to="/account" className={classNames({'active' : pathname === '/account'})}>Account/Settings</Link>
							</li>
						</ul>
					</div>
				}
			  </div>
		  );
	  }
	}

  render() {
		const { hideMobileMenu } = this.state;
		const showMenu = classNames({'menu-wrapper': hideMobileMenu});
		const menuBtn = classNames(hideMobileMenu ? 'ti-menu': 'ti-close');

    return (
	    <div className="header">
		    <div className="header__brand">
				<div className="header__logodiv">
          <Link to="/">
            <img src={logo} className="header__logo" alt="Catholic Singles" />
          </Link>
			    <i
				    onClick={this.toggleMenu.bind(this)}
				    className={menuBtn}
			    ></i>
				</div>
		    </div>
		    <div className={showMenu}>
			    {this.renderMenu()}
		    </div>
	    </div>
    );
  }
}

NavBar.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	location: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return createStructuredSelector({
    currentUser: authSelectors.selectCurrentUser(),
		mainPicture: memberProfilePicturesSelectors.currentUserMainProfilePictureSelector(),
		userNotifications: (state)=>{return notificationsSelectors.userNotificationsSelector(state)},
		accountSettings: accountSettingSelectors.selectAccountSettings()
	});
}

const mapDispatchToProps = {
	fetchCurrentUserProfilePicture: memberProfilePicturesActions.fetchCurrentUserProfilePicture,
	logoutRequest: authActions.logoutRequest,
	fetchCurrentUserNotificationsRequest: notificationsActions.fetchCurrentUserNotificationsRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
