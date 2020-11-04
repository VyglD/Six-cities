import React from "react";
import {connect} from "react-redux";
import OffersListFavorite from "../offers-list-favorite/offers-list-favorite";
import {getFavoriteOffersByCities} from "../../store/selectors";
import {
  offersType,
  offerIdsType,
  mapType,
} from "../../types";

const FavoritesCities = (props) => {
  const {
    favoriteOffersByCities,
  } = props;

  return (
    <ul className="favorites__list">
      {
        Array.from(favoriteOffersByCities.entries()).map(([city, offers]) => (
          <li className="favorites__locations-items" key={city}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{city}</span>
                </a>
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
  allOffers: offersType,
  favoriteIds: offerIdsType,
  favoriteOffersByCities: mapType,
};

const mapStateToProps = (state) => ({
  allOffers: state.OFFERS.allOffers,
  favoriteOffersByCities: getFavoriteOffersByCities(state),
});

export {FavoritesCities};
export default connect(mapStateToProps)(FavoritesCities);
