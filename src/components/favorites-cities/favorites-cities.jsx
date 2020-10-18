import React from "react";
import OfferCardFavorite from "../offer-card-favorite/offer-card-favorite";
import {
  offersType,
  favoriteOfferIdsType,
} from "../../types";
import withParentWrapping from "../../hocs/withParentWrapping/withParentWrapping";

const OfferCardFavoriteWrapped = withParentWrapping(OfferCardFavorite);

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
            <OfferCardFavoriteWrapped
              {...props}
              offers={offers}
              wrappingClass={`favorites__places`}
            />
          </li>
        ))
      }
    </ul>
  );
};

FavoritesCities.propTypes = {
  allOffers: offersType,
  favoriteOfferIds: favoriteOfferIdsType,
};

export default FavoritesCities;
