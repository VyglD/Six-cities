import React from "react";
import OfferCardFavorite from "../offer-card-favorite/offer-card-favorite";
import {
  mapType,
} from "../../types";

const FavoriteList = (props) => {
  const {
    offersByCities,
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
  offersByCities: mapType,
};

export default FavoriteList;
