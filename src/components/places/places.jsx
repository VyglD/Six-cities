import React from "react";
import PlacesEmpty from "../places-empty/places-empty";
import PlacesOffers from "../places-offers/places-offers";
import Map from "../map/map";
import {cityNameType, offersType} from "../../types";

const Places = (props) => {
  const {offers, activeCity} = props;
  const [activeOffer, setActiveOffer] = React.useState();

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
                onActiveCardChange={setActiveOffer}
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
};

export default Places;
