import React from "react";
import PlacesEmpty from "../places-empty/places-empty";
import PlacesOffers from "../places-offers/places-offers";
import Map from "../map/map";
import {cityNameType, functionType, notRequiredOfferType, offersType} from "../../types";

import withActiveItem from "../../hocs/with-active-item/with-active-item";

const Places = (props) => {
  const {offers, activeCity, activeOffer, onActiveCardChange} = props;

  const emptyTriger = offers.length === 0;

  return (
    <div className="cities">
      {
        emptyTriger
          ? (
            <PlacesEmpty />
          )
          : (
            <div className="cities__places-container container">
              <PlacesOffers
                offers={offers}
                activeCity={activeCity}
                onActiveCardChange={onActiveCardChange}
              />
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    offers={offers}
                    activeCity={activeCity}
                    activeOffer={activeOffer}
                  />
                </section>
              </div>
            </div>
          )

      }
    </div>
  );
};

Places.propTypes = {
  offers: offersType,
  activeCity: cityNameType,
  activeOffer: notRequiredOfferType,
  onActiveCardChange: functionType,
};

export {Places};
export default withActiveItem(
    Places,
    {
      activeItemName: `activeOffer`,
      onItemChangeName: `onActiveCardChange`,
    }
);
