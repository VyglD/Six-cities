import React from "react";
import OfferCard from "../offer-card/offer-card";
import {
  favoriteOfferIdsType,
  pathsType,
  cardStyleType,
  functionType,
  mapType,
  emailType,
} from "../../types";

const FavoriteList = (props) => {
  const {
    favoriteOfferIds,
    paths,
    cardStyle,
    getRateVisualisation,
    offersByCities,
    email,
    onFavoritesChange,
  } = props;

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
                    <OfferCard
                      key={offer.id}
                      offer={offer}
                      favoriteOfferIds={favoriteOfferIds}
                      paths={paths}
                      cardStyle={cardStyle}
                      getRateVisualisation={getRateVisualisation}
                      email={email}
                      onFavoritesChange={onFavoritesChange}
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
  favoriteOfferIds: favoriteOfferIdsType,
  paths: pathsType,
  cardStyle: cardStyleType,
  getRateVisualisation: functionType,
  offersByCities: mapType,
  email: emailType,
  onFavoritesChange: functionType,
};

export default FavoriteList;
