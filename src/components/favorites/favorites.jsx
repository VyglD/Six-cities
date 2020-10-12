import React from "react";
import {Link} from "react-router-dom";
import Header from "../header/header";
import FavoriteList from "../favorites-list/favorites-list";
import {
  favoriteOffersType,
  pathsType,
  cardStyleType,
  functionType,
  mapType,
  emailType,
} from "../../types";

const Favorites = (props) => {
  const {
    favoriteOffers,
    paths,
    cardStyle,
    getRateVisualisation,
    allOffersByCities,
    email,
  } = props;

  const favoriteOffersByCities = new Map(
      Array.from(allOffersByCities.entries()).map(([city, offers]) => {
        const favoriteOffersOfCity = offers.filter((offer) => favoriteOffers.includes(offer.id));

        return favoriteOffersOfCity.length > 0
          ? [city, favoriteOffersOfCity]
          : null;
      }).filter((item) => item)
  );

  const classPage = (
    `page ${
      favoriteOffersByCities.size > 0
        ? ``
        : `page--favorites-empty`
    }`
  );

  const classMain = (
    `page__main page__main--favorites ${
      favoriteOffersByCities.size > 0
        ? ``
        : `page__main--favorites-empty`
    }`
  );

  const classSection = (
    `favorites ${
      favoriteOffersByCities.size > 0
        ? ``
        : `favorites--empty`
    }`
  );

  return (
    <div className={classPage}>
      <Header
        paths={paths}
        email={email}
      />

      <main className={classMain}>
        <div className="page__favorites-container container">
          <section className={classSection}>
            <h1 className="favorites__title">Saved listing</h1>
            {
              favoriteOffersByCities.size > 0
                ? (
                  <FavoriteList
                    paths={paths}
                    cardStyle={cardStyle}
                    getRateVisualisation={getRateVisualisation}
                    offersByCities={favoriteOffersByCities}
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
        <Link
          className="footer__logo-link"
          to={paths.MAIN}
        >
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  favoriteOffers: favoriteOffersType,
  paths: pathsType,
  cardStyle: cardStyleType,
  getRateVisualisation: functionType,
  allOffersByCities: mapType,
  email: emailType,
};

export default Favorites;
