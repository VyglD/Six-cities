import React from "react";
import OfferCard from "../offer-card/offer-card";
import {
  pathsType,
  cardStyleType,
  functionType,
  mapType,
} from "../../types";

const FavoriteList = (props) => {
  const {
    paths,
    cardStyle,
    getRateVisualisation,
    offersByCities
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
                      paths={paths}
                      cardStyle={cardStyle}
                      getRateVisualisation={getRateVisualisation}
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
  paths: pathsType,
  cardStyle: cardStyleType,
  getRateVisualisation: functionType,
  offersByCities: mapType,
};

export default FavoriteList;
