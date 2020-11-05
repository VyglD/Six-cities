import React from "react";
import PlacesOffers from "../places-offers/places-offers";
import Map from "../map/map";
import {offersType} from "../../types";

import withActiveItem from "../../hocs/with-active-item/with-active-item";

const Places = (props) => {
  const {offers} = props;

  return (
    <div className="cities">
      {
        offers.length > 0
          ? (
            <div className="cities__places-container container">
              <PlacesOffers
                {...props}
              />
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    {...props}
                  />
                </section>
              </div>
            </div>
          )
          : (
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">
                    We could not find any property available at the moment in Dusseldorf
                  </p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          )

      }
    </div>
  );
};

Places.propTypes = {
  offers: offersType,
};

export {Places};
export default withActiveItem(
    Places,
    {
      activeItemName: `activeOffer`,
      onItemChangeName: `onActiveCardChange`,
    }
);
