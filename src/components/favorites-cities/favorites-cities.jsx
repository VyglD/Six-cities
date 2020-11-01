import React from "react";
import {connect} from "react-redux";
import OffersListFavorite from "../offers-list-favorite/offers-list-favorite";
import {
  offersType,
  offerIdsType,
} from "../../types";


const getFavoriteOffersByCities = (offers, ids) => {
  const favoriteOffersByCities = new Map();

  offers.filter((offer) => ids.includes(offer.id))
    .forEach((offer) => {
      if (favoriteOffersByCities.has(offer.city)) {
        favoriteOffersByCities.get(offer.city).push(offer);
      } else {
        favoriteOffersByCities.set(offer.city, [offer]);
      }
    });

  return favoriteOffersByCities;
};

const FavoritesCities = (props) => {
  const {
    allOffers,
    favoriteOfferIds,
  } = props;

  const offersByCities = getFavoriteOffersByCities(allOffers, favoriteOfferIds);

  return (
    <ul className="favorites__list">
      {
        Array.from(offersByCities.entries()).map(([city, offers]) => (
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
              {...props}
            />
          </li>
        ))
      }
    </ul>
  );
};

FavoritesCities.propTypes = {
  allOffers: offersType,
  favoriteOfferIds: offerIdsType,
};

const mapStateToProps = ({OFFERS}) => ({
  allOffers: OFFERS.allOffers,
});

export {FavoritesCities};
export default connect(mapStateToProps)(FavoritesCities);
