import React from "react";
import {Link} from "react-router-dom";
import {
  offerType,
  favoriteOfferIdsType,
  functionType,
  notRequiredFunctionType,
  emailType,
  CardStyleType
} from "../../types";
import {Path} from "../../const";
import {getRateVisualisation} from "../../util";

const OfferCard = (props) => {
  const {
    offer,
    favoriteOfferIds,
    email,
    onMouseEnter = (() => {}),
    onFavoritesChange,
    CardStyle,
  } = props;

  const {
    article,
    imgWrapper,
    imgWidth,
    imgHeight,
    info,
  } = CardStyle;

  const articleClass = `place-card ${article}`;
  const imgWrapperClass = `place-card__image-wrapper ${imgWrapper}`;
  const infoClass = `place-card__info ${info}`;

  const favoriteClass = (
    `place-card__bookmark-button button ${
      email && favoriteOfferIds.includes(offer.id)
        ? `place-card__bookmark-button--active`
        : ``
    }`
  );

  const linkHref = `${Path.OFFER}/${offer.id}`;

  return (
    <article
      className={articleClass}
      onMouseEnter={() => onMouseEnter(offer)}
    >
      {offer.isPremium
        ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : ``}
      <div className={imgWrapperClass}>
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
      <div className={infoClass}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.cost}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={favoriteClass}
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
  onMouseEnter: notRequiredFunctionType,
  onFavoritesChange: functionType,
  CardStyle: CardStyleType,
};

export default OfferCard;
