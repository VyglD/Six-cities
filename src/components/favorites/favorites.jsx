import React from "react";
import FavoriteList from "../favorites-list/favorites-list";
import {
  componentType,
  offersType,
  favoriteOffersType,
  functionType,
  customOfferCardPropertiesType
} from "../../types";

const Favorites = (props) => {
  const {
    header,
    offers,
    favoriteOffers,
    getRateVisualisation,
    getOffersByCities,
    customOfferCardProperties
  } = props;

  const offersByCityEntries = Array.from(
      getOffersByCities(
          offers.filter((offer) => favoriteOffers.includes(offer.id))
      ).entries())
      .filter(([_, array]) => array.length > 0);


  const classPage = (
    `page ${
      offersByCityEntries.length > 0
        ? ``
        : `page--favorites-empty`
    }`
  );

  const classMain = (
    `page__main page__main--favorites ${
      offersByCityEntries.length > 0
        ? ``
        : `page__main--favorites-empty`
    }`
  );

  const classSection = (
    `favorites ${
      offersByCityEntries.length > 0
        ? ``
        : `favorites--empty`
    }`
  );

  return (
    <div className={classPage}>
      {header}

      <main className={classMain}>
        <div className="page__favorites-container container">
          <section className={classSection}>
            <h1 className="favorites__title">Saved listing</h1>
            {
              offersByCityEntries.length > 0
                ? (
                  <FavoriteList
                    offersByCityEntries={offersByCityEntries}
                    getRateVisualisation={getRateVisualisation}
                    customOfferCardProperties={customOfferCardProperties}
                  />
                )
                : (
                  <div className="favorites__status-wrapper">
                    <b className="favorites__status">Nothing yet saved.</b>
                    <p className="favorites__status-description">
                      Save properties to narrow down search or plan yor future trips.
                    </p>
                  </div>
                )
            }
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  offers: offersType,
  favoriteOffers: favoriteOffersType,
  getRateVisualisation: functionType,
  getOffersByCities: functionType,
  header: componentType,
  customOfferCardProperties: customOfferCardPropertiesType,
};

export default Favorites;
