import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import closeIcon from '../../static/images/close.svg'
import newMessageIcon from '../../static/images/nav-messages.svg'
import profileViewIcon from '../../static/images/profile-views.svg'

class Notification extends Component {
  renderNotification(icon, text, url) {
    const showClose = false // Disable close buttons for now

    return (
      <div className="dashboard__notifications__box">
        { showClose &&
          <div className="close"><img src={closeIcon} alt="Close" className="close" /></div>
        }

        <Link to={url}>
          <div className="dashboard__notifications__content">
            <div className="dashboard__notifications__icon">
              <img src={icon} alt="New Message Icon" className="icon"/>
            </div>
            <div className="dashboard__notifications__text">{ text }</div>
          </div>
        </Link>
      </div>
    )
  }

  render() {
    const { notification } = this.props

    const count = notification.get("count")
    switch(notification.get("kind")) {
      case 'new_messages':
        const newMessageText = `You have ${count} new ${count === 1 ? 'message' : 'messages'}!`
        return this.renderNotification(newMessageIcon, newMessageText, '/messages')
      case 'profile_views':
        const profileViewText = `${count} ${count === 1 ? 'person' : 'people'} viewed your profile`
        return this.renderNotification(profileViewIcon, profileViewText, '/favorites')
      default:
        return (null)
    }
  }
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired
}

export default Notification;
