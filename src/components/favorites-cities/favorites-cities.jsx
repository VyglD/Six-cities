import React from "react";
import {connect} from "react-redux";
import LocationsLink from "../locations-link/locations-link";
import OffersListFavorite from "../offers-list-favorite/offers-list-favorite";
import ActionCreator from "../../store/root-actions";
import {getFavoriteOffersByCities} from "../../store/selectors";
import {Path} from "../../const";
import {
  mapType,
  functionType,
} from "../../types";

const FavoritesCities = (props) => {
  const {
    favoriteOffersByCities,
    showCityOffers,
  } = props;

  const handleCityClick = React.useCallback(
      (evt) => {
        showCityOffers(evt.target.textContent);
      },
      [showCityOffers]
  );


  return (
    <ul className="favorites__list">
      {
        Array.from(favoriteOffersByCities.entries()).map(([city, offers]) => (
          <li className="favorites__locations-items" key={city}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <LocationsLink
                  city={city}
                  activeCity={city}
                  onCityClick={handleCityClick}
                />
              </div>
            </div>
            <OffersListFavorite
              offers={offers}
            />
          </li>
        ))
      }
    </ul>
  );
};

FavoritesCities.propTypes = {
  favoriteOffersByCities: mapType,
  showCityOffers: functionType,
};

const mapStateToProps = (state) => ({
  favoriteOffersByCities: getFavoriteOffersByCities(state),
});

const mapDispatchToProps = (dispatch) => ({
  showCityOffers(city) {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.redirectTo(Path.MAIN));
  }
});

export {FavoritesCities};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesCities);
