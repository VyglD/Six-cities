import React from "react";
import {connect} from "react-redux";
import Header from "../header/header";
import LoginForm from "../login-form/login-form";
import LocationsLink from "../locations-link/locations-link";
import ActionCreator from "../../store/root-actions";
import {AMSTERDAM, Path} from "../../const";
import {cityNameType, functionType} from "../../types";

class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this._handleAmsterdamClick = this._handleAmsterdamClick.bind(this);
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
              <LoginForm />
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
  activeCity: cityNameType,
  showAmsterdamOffers: functionType,
};

const mapStateToProps = (state) => ({
  activeCity: state.CITY.activeCity,
});

const mapDispatchToProps = (dispatch) => ({
  showAmsterdamOffers() {
    dispatch(ActionCreator.changeCity(AMSTERDAM));
    dispatch(ActionCreator.redirectTo(Path.MAIN));
  }
});

export {Login};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
