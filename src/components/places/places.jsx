import React from "react";
import PlacesEmpty from "../places-empty/places-empty";
import PlacesOffers from "../places-offers/places-offers";
import Map from "../map/map";
import {offersType} from "../../types";

import withActiveItem from "../../hocs/with-active-item/with-active-item";

const Places = (props) => {
  const {offers} = props;

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
