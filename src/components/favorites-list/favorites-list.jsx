import React from "react";
import OfferCardFavorite from "../offer-card-favorite/offer-card-favorite";
import {
  offersType,
  favoriteOfferIdsType,
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

const FavoriteList = (props) => {
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
            <div className="favorites__places">
              {
                offers.map((offer) => {
                  return (
                    <OfferCardFavorite
                      key={offer.id}
                      {...props}
                      offer={offer}
                    />
                  );
                })
              }
            </div>
          </li>
        ))
      }
    </ul>
  );
};

FavoriteList.propTypes = {
  allOffers: offersType,
  favoriteOfferIds: favoriteOfferIdsType,
};

export default FavoriteList;
