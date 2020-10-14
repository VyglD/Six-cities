import React from "react";
import OffersList from "../offers-list/offers-list";
import {
  offersType,
  сityType,
} from "../../types";

const Cities = (props) => {
  const {
    offers,
    activeCity,
  } = props;

  return (
    <div className="cities">
      {
        offers.length > 0
          ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {activeCity}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex="0">
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom">
                    <li className="places__option places__option--active" tabIndex="0">Popular</li>
                    <li className="places__option" tabIndex="0">Price: low to high</li>
                    <li className="places__option" tabIndex="0">Price: high to low</li>
                    <li className="places__option" tabIndex="0">Top rated first</li>
                  </ul>
                </form>

                <OffersList
                  {...props}
                />

              </section>
              <div className="cities__right-section">
                <section className="cities__map map"></section>
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

Cities.propTypes = {
  offers: offersType,
  activeCity: сityType,
};

export default Cities;
