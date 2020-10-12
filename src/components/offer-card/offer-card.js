import React from "react";
import {offerType, functionType} from "../../types";

class OfferCard extends React.PureComponent {
  render() {
    const {
      offer,
      getRateVisualisation,
      onMouseEnter,
      onClick
    } = this.props;

    return (
      <article
        className="cities__place-card place-card"
        onMouseEnter={onMouseEnter.bind(this, offer)}
        onClick={onClick}
      >
        {offer.isPremium
          ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
          : ``}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src={offer.photos[0]} width="260" height="200" alt="Place image"/>
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{offer.cost}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
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
  }
}

OfferCard.propTypes = {
  offer: offerType,
  getRateVisualisation: functionType,
  onMouseEnter: functionType,
  onClick: functionType,
};

export default OfferCard;
