import React from "react";
import {connect} from "react-redux";
import LocationsList from "../locations-list/locations-list";
import Places from "../places/places";
import ActionCreator from "../../store/root-actions";
import {getOffersByCities} from "../../store/selectors";
import {
  cityNameType,
  functionType,
  mapType,
} from "../../types";

class MainContent extends React.PureComponent {
  constructor(props) {
    super(props);

    this._handleChangeActiveCity = this._handleChangeActiveCity.bind(this);
  }

  _handleChangeActiveCity(evt) {
    const newCity = evt.target.textContent;

    evt.preventDefault();

    this.props.onActiveCityChange(newCity);
  }

  render() {
    const {offersByCities, activeCity} = this.props;

    const offers = offersByCities.get(activeCity);

    return (
      <main
        className={
          `page__main page__main--index ${
            offers.length === 0 && `page__main--index-empty`
          }`
        }
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsList
            activeCity={activeCity}
            onActiveCityChange={this._handleChangeActiveCity}
          />
        </div>
        <Places
          activeCity={activeCity}
          offers={offers}
        />
      </main>
    );
  }
}

MainContent.propTypes = {
  activeCity: cityNameType,
  onActiveCityChange: functionType,
  offersByCities: mapType,
};

const mapStateToProps = (state) => ({
  activeCity: state.CITY.activeCity,
  offersByCities: getOffersByCities(state),
});

const mapDispatchToProps = (dispatch) => ({
  onActiveCityChange: (newCity) => {
    dispatch(ActionCreator.changeCity(newCity));
  },
});

export {MainContent};
export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
