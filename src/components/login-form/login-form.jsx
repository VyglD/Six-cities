import React from "react";
import {connect} from "react-redux";
import {tryLogin} from "../../middlewares/thunk-api";
import {functionType} from "../../types";

const EMAIL_REGEX = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const EMAIL_ERROR = `Email введен неправильно`;
const PASSWORD_ERROR = `Пароль не введен`;
const SERVER_ERROR = `Ошибка на сервере`;

const LoginForm = (props) => {
  const {logIn} = props;

  const emailFieldRef = React.useRef();
  const passwordFieldRef = React.useRef();

  const showServerError = React.useCallback(
      () => {
        passwordFieldRef.current.setCustomValidity(SERVER_ERROR);
        passwordFieldRef.current.reportValidity();
      },
      []
  );

  const isFieldValid = React.useCallback(
      (field, condition, errorMessage) => {
        if (condition) {
          field.setCustomValidity(``);
        } else {
          field.setCustomValidity(errorMessage);
        }

        return condition;
      },
      []
  );

  const isEmailValid = React.useCallback(
      () => isFieldValid(
          emailFieldRef.current,
          EMAIL_REGEX.exec(emailFieldRef.current.value),
          EMAIL_ERROR
      ),
      [isFieldValid]
  );

  const isPasswordValid = React.useCallback(
      () => isFieldValid(
          passwordFieldRef.current,
          passwordFieldRef.current.value.length > 0,
          PASSWORD_ERROR
      ),
      [isFieldValid]
  );

  const isFormValid = React.useCallback(
      () => {
        return isEmailValid() && isPasswordValid();
      },
      [isEmailValid, isPasswordValid]
  );

  const handleFieldValueChange = React.useCallback(
      () => {
        return isFormValid();
      },
      [isFormValid]
  );

  const handleSubmitButtonClick = React.useCallback(
      (evt) => {
        if (isFormValid()) {
          evt.preventDefault();

          logIn(
              {
                email: emailFieldRef.current.value,
                password: passwordFieldRef.current.value,
              },
              showServerError
          );
        }
      },
      [logIn, isFormValid, showServerError]
  );

  return (
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
          ref={emailFieldRef}
          onChange={handleFieldValueChange}
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
          ref={passwordFieldRef}
          onChange={handleFieldValueChange}
          autoComplete="off"
          required
        />
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
        onClick={handleSubmitButtonClick}
      >
        Sign in
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  logIn: functionType,
};

const mapDispatchToProps = (dispatch) => ({
  logIn(data, onFail) {
    dispatch(tryLogin(data))
      .catch(() => onFail());
  },
});

export {LoginForm};
export default connect(null, mapDispatchToProps)(LoginForm);
