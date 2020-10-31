import React from "react";
import {Link} from "react-router-dom";
import FavoriteButton from "../favorite-button/favorite-button";
import {
  offerType,
  notRequiredFunctionType,
  cardStyleType
} from "../../types";
import {Path} from "../../const";
import {getRateVisualisation} from "../../util";

class OfferCard extends React.Component {
  // shouldComponentUpdate(nextProps) {
  //   if (
  //     nextProps.email
  //     && getArraysDifference(
  //         nextProps.favoriteOfferIds,
  //         this.props.favoriteOfferIds
  //     ).includes(nextProps.offer.id)
  //   ) {
  //     return true;
  //   }

  //   return false;
  // }

  render() {
    const {
      offer,
      onActiveCardChange = (() => {}),
      cardStyle,
    } = this.props;

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
            <FavoriteButton
              offer={offer}
            />
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
  }
}

OfferCard.propTypes = {
  offer: offerType,
  onActiveCardChange: notRequiredFunctionType,
  cardStyle: cardStyleType,
};

export {OfferCard};
export default React.memo(OfferCard);
