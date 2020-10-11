import React from "react";
import {
  componentType,
  offersType,
  favoriteOffersType,
  rateCoefficientType
} from "../../types";

const Favorites = (props) => {
  const {header, offers, favoriteOffers, rateCoefficient: ratecoefficient} = props;

  const offersByCity = new Map();
  offers
    .filter((offer) => favoriteOffers.includes(offer.id))
    .map((offer) => {
      if (offersByCity.has(offer.city)) {
        offersByCity.get(offer.city).push(offer);
      } else {
        offersByCity.set(offer.city, [offer]);
      }
    });

  return (
    <div className="page">
      {header}

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                Array.from(offersByCity.keys())
                  .map((city) => (
                    <li className="favorites__locations-items" key={city}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>
                      {
                        offersByCity.get(city)
                          .map((offer) => {
                            const style = {
                              width: `${offer.rate * ratecoefficient}%`
                            };

                            return (
                              <article className="favorites__card place-card" key={offer.id}>
                                <div className="favorites__image-wrapper place-card__image-wrapper">
                                  <a href="#">
                                    <img className="place-card__image" src={offer.photos[0]} width="150" height="110" alt="Place image"/>
                                  </a>
                                </div>
                                <div className="favorites__card-info place-card__info">
                                  <div className="place-card__price-wrapper">
                                    <div className="place-card__price">
                                      <b className="place-card__price-value">&euro;{offer.cost}</b>
                                      <span className="place-card__price-text">&#47;&nbsp;night</span>
                                    </div>
                                    <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                                      <svg className="place-card__bookmark-icon" width="18" height="19">
                                        <use xlinkHref="#icon-bookmark"></use>
                                      </svg>
                                      <span className="visually-hidden">In bookmarks</span>
                                    </button>
                                  </div>
                                  <div className="place-card__rating rating">
                                    <div className="place-card__stars rating__stars">
                                      <span style={style}></span>
                                      <span className="visually-hidden">Rating</span>
                                    </div>
                                  </div>
                                  <h2 className="place-card__name">
                                    <a href="#">{offer.title}</a>
                                  </h2>
                                  <p className="place-card__type">{offer.housingType}</p>
                                </div>
                              </article>
                            );
                          })
                      }
                    </li>
                  ))
              }
            </ul>
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
  rateCoefficient: rateCoefficientType,
  header: componentType,
};

export default Favorites;
