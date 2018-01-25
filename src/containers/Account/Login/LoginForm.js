import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextInput from '../../../components/TextInput/';
import Button from '../../../components/Button';
import NotificationSystem from '../../../components/NotificationSystem';

const LoginForm = ({ value, notification, buttonLabel, handleOnChange, handleOnSubmit, dismissToaster }) => {
  return (
    <form onSubmit={handleOnSubmit} className="login">
      <p className="login__header">Enter you email and password to enter in to CatholicSingles.com</p>
      <NotificationSystem dismissToaster={dismissToaster} notification={notification} />
      <TextInput
        value={value.email}
        type="text"
        name="email"
        placeholder="Email"
        onChange={handleOnChange}
      />
      <TextInput
        value={value.passsword}
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleOnChange}
      />
      <Link to="#" className="login__forgot">I forgot my passsword</Link>
      <Button type="submit" className="login__button">{buttonLabel}</Button>
    </form>
  )
}

LoginForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  handleOnChange: PropTypes.func,
  handleOnSubmit: PropTypes.func,
  dismissToaster: PropTypes.func,
  notification: PropTypes.string
}

export default LoginForm;