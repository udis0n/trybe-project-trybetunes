import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import './Login.css';

export default class Login extends Component {
  signIn = async () => {
    const { userName, history: { push } } = this.props;
    push('/loading');
    await createUser({ name: userName });
    push('/search');
  }

  render() {
    const { changeHandler, buttonIsDisabled } = this.props;

    return (
      <div className="Login" data-testid="page-login">
        <form>
          <div className="login-input-container">
            <div className="login-logo">
              <FontAwesomeIcon className="login-icon" icon={ faCompactDisc } />
              <div className="login-logo-text">
                Trybetunes
              </div>
            </div>
            <input
              className="login-input"
              placeholder="Username"
              autoComplete="off"
              data-testid="login-name-input"
              type="text"
              onChange={ changeHandler }
            />
            <button
              className="login-button"
              data-testid="login-submit-button"
              type="button"
              disabled={ buttonIsDisabled }
              onClick={ this.signIn }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  buttonIsDisabled: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
