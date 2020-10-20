import React from "react";
import {Link} from "react-router-dom";
import {
  offerType,
  favoriteOfferIdsType,
  functionType,
  notRequiredFunctionType,
  emailType,
  cardStyleType
} from "../../types";
import {Path} from "../../const";
import {getRateVisualisation} from "../../util";

const OfferCard = (props) => {
  const {
    offer,
    favoriteOfferIds,
    email,
    onActiveCardChange = (() => {}),
    onFavoritesChange,
    cardStyle,
  } = props;

  const {
    article = ``,
    imgWrapper = ``,
    imgWidth = 260,
    imgHeight = 200,
    info = ``,
  } = cardStyle;

  const linkHref = `${Path.OFFER}/${offer.id}`;

  return (
    <article
      className={`place-card ${article}`}
      onMouseEnter={() => onActiveCardChange(offer)}
      onMouseLeave={() => onActiveCardChange(null)}
    >
      {offer.isPremium
        ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : ``}
      <div className={`place-card__image-wrapper ${imgWrapper}`}>
        <Link to={linkHref}>
          <img
            className="place-card__image"
            src={offer.photos[0]}
            width={imgWidth}
            height={imgHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`place-card__info ${info}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.cost}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={
              `place-card__bookmark-button button ${
                Boolean(email) && favoriteOfferIds.includes(offer.id)
                && `place-card__bookmark-button--active`
              }`
            }
            type="button"
            onClick={() => onFavoritesChange(offer)}
          >
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
          <Link to={linkHref}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.housingType}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  offer: offerType,
  favoriteOfferIds: favoriteOfferIdsType,
  email: emailType,
  onActiveCardChange: notRequiredFunctionType,
  onFavoritesChange: functionType,
  cardStyle: cardStyleType,
};

export default OfferCard;
