import React from "react";
import {connect} from "react-redux";
import Header from "../header/header";
import {tryLogin} from "../../middlewares/thunk-api";
import {functionType} from "../../types";

const EMAIL_REGEX = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const emailError = `Email введен неправильно`;
const passwordError = `Пароль не введен`;
const serverError = `Ошибка на сервере`;

class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this._emailFieldRef = React.createRef();
    this._passwordFieldRef = React.createRef();

    this._handleSubmit = this._handleSubmit.bind(this);
    this._showServerError = this._showServerError.bind(this);
    this._onFieldValueChange = this._onFieldValueChange.bind(this);
  }

  _isFieldValid(field, condition, errorMessage) {
    if (condition) {
      field.setCustomValidity(``);
    } else {
      field.setCustomValidity(errorMessage);
    }

    return condition;
  }

  _isEmailValid() {
    return this._isFieldValid(
        this._emailFieldRef.current,
        EMAIL_REGEX.exec(this._emailFieldRef.current.value),
        emailError
    );
  }

  _isPasswordValid() {
    return this._isFieldValid(
        this._passwordFieldRef.current,
        this._passwordFieldRef.current.value.length > 0,
        passwordError
    );
  }

  _isFormValid() {
    return this._isEmailValid() && this._isPasswordValid();
  }

  _showServerError() {
    this._passwordFieldRef.current.setCustomValidity(serverError);
    this._passwordFieldRef.current.reportValidity();
  }

  _handleSubmit(evt) {
    if (this._isFormValid()) {
      evt.preventDefault();

      this.props.login(
          {
            email: this._emailFieldRef.current.value,
            password: this._passwordFieldRef.current.value,
          },
          this._showServerError
      );
    }
  }

  _onFieldValueChange(evt) {
    const input = evt.target;

    this.setState({
      [input.name]: input.value,
    });
  }

  render() {
    return (
      <div className="page page--gray page--login">
        <Header />

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form
                className="login__form form"
                action="#"
                method="post"
              >
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    ref={this._emailFieldRef}
                    required
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    ref={this._passwordFieldRef}
                    autoComplete="off"
                    required
                  />
                </div>
                <button
                  className="login__submit form__submit button"
                  type="submit"
                  onClick={this._handleSubmit}
                >
                  Sign in
                </button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  login: functionType,
};

const mapDispatchToProps = (dispatch) => ({
  login(data, callback) {
    dispatch(tryLogin(data))
      .catch(() => callback());
  }
});

export {Login};
export default connect(null, mapDispatchToProps)(Login);
