import React from "react";
import {functionType, offersByCityEntriesType} from "../../types";

const FavoriteList = (props) => {
  const {offersByCityEntries, getRateVisualisation} = props;

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
                            <span style={getRateVisualisation(offer.rate)}></span>
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
};

export default FavoriteList;
