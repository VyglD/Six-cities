import React from "react";
import OfferCard from "../offer-card/offer-card";
import {customOfferCardPropertiesType, functionType, offersByCityEntriesType} from "../../types";

const FavoriteList = (props) => {
  const {
    offersByCityEntries,
    getRateVisualisation,
    customOfferCardProperties
  } = props;

  return (
    <ul className="favorites__list">
      {
        offersByCityEntries.map(([city, offers]) => (
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
                      offer={offer}
                      getRateVisualisation={getRateVisualisation}
                      onMouseEnter={() => {}}
                      onClick={() => {}}
                      key={offer.id}
                      customOfferCardProperties={customOfferCardProperties}
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
  offersByCityEntries: offersByCityEntriesType,
  getRateVisualisation: functionType,
  customOfferCardProperties: customOfferCardPropertiesType
};

export default FavoriteList;
