import React from "react";
import {connect} from "react-redux";
import Header from "../header/header";
import LocationsLink from "../locations-link/locations-link";
import ActionCreator from "../../store/root-actions";
import {tryLogin} from "../../middlewares/thunk-api";
import {AMSTERDAM, Path} from "../../const";
import {cityNameType, functionType} from "../../types";

const EMAIL_REGEX = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const EMAIL_ERROR = `Email введен неправильно`;
const PASSWORD_ERROR = `Пароль не введен`;
const SERVER_ERROR = `Ошибка на сервере`;

class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this._emailFieldRef = React.createRef();
    this._passwordFieldRef = React.createRef();

    this._handleSubmitButtonClick = this._handleSubmitButtonClick.bind(this);
    this._handleAmsterdamClick = this._handleAmsterdamClick.bind(this);

    this._showServerError = this._showServerError.bind(this);
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
        EMAIL_ERROR
    );
  }

  _isPasswordValid() {
    return this._isFieldValid(
        this._passwordFieldRef.current,
        this._passwordFieldRef.current.value.length > 0,
        PASSWORD_ERROR
    );
  }

  _isFormValid() {
    return this._isEmailValid() && this._isPasswordValid();
  }

  _showServerError() {
    this._passwordFieldRef.current.setCustomValidity(SERVER_ERROR);
    this._passwordFieldRef.current.reportValidity();
  }

  _handleSubmitButtonClick(evt) {
    if (this._isFormValid()) {
      evt.preventDefault();

      this.props.logIn(
          {
            email: this._emailFieldRef.current.value,
            password: this._passwordFieldRef.current.value,
          },
          this._showServerError
      );
    }
  }

  _handleAmsterdamClick(evt) {
    evt.preventDefault();

    this.props.showAmsterdamOffers();
  }

  render() {
    const {activeCity} = this.props;

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
                  onClick={this._handleSubmitButtonClick}
                >
                  Sign in
                </button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <LocationsLink
                  city={AMSTERDAM}
                  activeCity={activeCity}
                  onCityClick={this._handleAmsterdamClick}
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  logIn: functionType,
  activeCity: cityNameType,
  showAmsterdamOffers: functionType,
};

const mapStateToProps = (state) => ({
  activeCity: state.CITY.activeCity,
});

const mapDispatchToProps = (dispatch) => ({
  logIn(data, onFail) {
    dispatch(tryLogin(data))
      .catch(() => onFail());
  },
  showAmsterdamOffers() {
    dispatch(ActionCreator.changeCity(AMSTERDAM));
    dispatch(ActionCreator.redirectTo(Path.MAIN));
  }
});

export {Login};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
