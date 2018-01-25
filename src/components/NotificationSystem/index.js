import React from 'react';
import PropTypes from 'prop-types';

function toggleClass(notification) {
  const alertClasses = {
    success: 'success',
    failure: 'danger',
  };
  return `alert__${alertClasses[notification.type]}`;
}

const NotificationSystem = ({ notification, dismissToaster, className='' }) => {
  if (!notification) return null;
  return (
    <div
      className={`display__notification ${toggleClass(notification)} ${className}`}
      role="alert"
    >
      <strong>{notification.message}</strong>
      <div
        onClick={dismissToaster}
        className="close"
      >
      <i className={`ti-close close__${notification.type}`}></i>
      <small>Dismiss</small>
      </div>
    </div>
  );
}

NotificationSystem.propTypes = {
  dismissToaster: PropTypes.func,
  notification: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  }),
  className: PropTypes.string
};

export default NotificationSystem;
