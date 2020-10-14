import React from "react";
import {Link} from "react-router-dom";
import Header from "../header/header";
import FavoriteList from "../favorites-list/favorites-list";
import {
  favoriteOfferIdsType,
  functionType,
  mapType,
  emailType,
} from "../../types";
import {Path} from "../../const";

const Favorites = (props) => {
  const {
    favoriteOfferIds,
    allOffersByCities,
    email,
    onFavoritesChange,
  } = props;

  const favoriteOfferIdsByCities = new Map(
      Array.from(allOffersByCities.entries()).map(([city, offers]) => {
        const favoriteOfferIdsOfCity = offers.filter((offer) => favoriteOfferIds.includes(offer.id));

        return favoriteOfferIdsOfCity.length > 0
          ? [city, favoriteOfferIdsOfCity]
          : null;
      }).filter((item) => item)
  );

  const classPage = (
    `page ${
      favoriteOfferIdsByCities.size > 0
        ? ``
        : `page--favorites-empty`
    }`
  );

  const classMain = (
    `page__main page__main--favorites ${
      favoriteOfferIdsByCities.size > 0
        ? ``
        : `page__main--favorites-empty`
    }`
  );

  const classSection = (
    `favorites ${
      favoriteOfferIdsByCities.size > 0
        ? ``
        : `favorites--empty`
    }`
  );

  return (
    <div className={classPage}>
      <Header
        email={email}
      />

      <main className={classMain}>
        <div className="page__favorites-container container">
          <section className={classSection}>
            <h1 className="favorites__title">Saved listing</h1>
            {
              favoriteOfferIdsByCities.size > 0
                ? (
                  <FavoriteList
                    favoriteOfferIds={favoriteOfferIds}
                    offersByCities={favoriteOfferIdsByCities}
                    email={email}
                    onFavoritesChange={onFavoritesChange}
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
          to={Path.MAIN}
        >
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  favoriteOfferIds: favoriteOfferIdsType,
  allOffersByCities: mapType,
  email: emailType,
  onFavoritesChange: functionType,
};

export default Favorites;
