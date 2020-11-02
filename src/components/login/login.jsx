import React from "react";
import {connect} from "react-redux";
import Header from "../header/header";
import ActionCreator from "../../store/root-actions";
import {functionType} from "../../types";

class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this._formRef = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    // ToDo:
    // Вызов метода авторизации на серевере
    this.props.login(new FormData(this._formRef.current).get(`email`));
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
                ref={this._formRef}
                onSubmit={this.handleSubmit}
              >
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
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
                    autoComplete="off"
                    required
                  />
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
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
  login(email) {
    dispatch(ActionCreator.login(email));
  }
});

export {Login};
export default connect(null, mapDispatchToProps)(Login);
