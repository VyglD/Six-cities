import React from "react";
import {Link} from "react-router-dom";
import FavoriteButton from "../favorite-button/favorite-button";
import Stars from "../stars/stars";
import {Path, FavoriteBtnStyle} from "../../const";
import {
  offerType,
  notRequiredFunctionType,
  cardStyleType
} from "../../types";

const STARS_CLASS = `place-card__stars`;

const OfferCard = (props) => {
  const {
    offer,
    onActiveCardChange = (() => {}),
    cardStyle,
  } = props;

  const {
    article,
    imgWrapper,
    imgWidth,
    imgHeight,
    info,
  } = cardStyle;

  const linkHref = `${Path.OFFER}/${offer.id}`;

  const handleActiveCardSelect = () => onActiveCardChange(offer);
  const handleActiveCardReset = () => onActiveCardChange(null);

  return (
    <article
      className={`place-card ${article}`}
      onMouseEnter={handleActiveCardSelect}
      onFocus={handleActiveCardSelect}
      onMouseLeave={handleActiveCardReset}
      onBlur={handleActiveCardReset}
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
          <FavoriteButton
            offer={offer}
            favoriteBtnStyle={FavoriteBtnStyle.CARD}
          />
        </div>
        <div className="place-card__rating rating">
          <Stars
            customClass={STARS_CLASS}
            offer={offer}
          />
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
  onActiveCardChange: notRequiredFunctionType,
  cardStyle: cardStyleType,
};

export {OfferCard};
export default React.memo(OfferCard);
