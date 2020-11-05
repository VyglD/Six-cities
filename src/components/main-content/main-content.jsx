import React from "react";
import {connect} from "react-redux";
import LocationsList from "../locations-list/locations-list";
import Places from "../places/places";
import {getOffersByCities, getFirstNotEmptyCity} from "../../store/selectors";
import {
  cityNameType,
  functionType,
  mapType,
  notRequiredCityNameType,
  offersType
} from "../../types";

import withActiveItem from "../../hocs/with-active-item/with-active-item";

class MainContent extends React.PureComponent {
  constructor(props) {
    super(props);

    this._handleChangeActiveCity = this._handleChangeActiveCity.bind(this);
  }

  _handleChangeActiveCity(evt) {
    const {onChangeActiveCity} = this.props;
    const newCity = evt.target.textContent;

    evt.preventDefault();

    onChangeActiveCity(newCity);
  }

  render() {
    const {offersByCities, activeCity: city, firstNotEmptyCity} = this.props;

    const activeCity = city ? city : firstNotEmptyCity;
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
            onChangeActiveCity={this._handleChangeActiveCity}
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
  allOffers: offersType,
  activeCity: notRequiredCityNameType,
  onChangeActiveCity: functionType,
  offersByCities: mapType,
  firstNotEmptyCity: cityNameType,
};

const mapStateToProps = (state) => ({
  allOffers: state.OFFERS.allOffers,
  offersByCities: getOffersByCities(state),
  firstNotEmptyCity: getFirstNotEmptyCity(state),
});

export {MainContent};
export default withActiveItem(
    connect(mapStateToProps)(MainContent),
    {
      activeItemName: `activeCity`,
      onItemChangeName: `onChangeActiveCity`,
    }
);
