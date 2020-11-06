import React from "react";
import OffersList from "../offers-list/offers-list";
import {offersType} from "../../types";

const CARD_STYLE = {
  article: `favorites__card`,
  imgWrapper: `favorites__image-wrapper`,
  imgWidth: 150,
  imgHeight: 110,
  info: `favorites__card-info`,
};

const OffersListFavorite = (props) => {
  return (
    <OffersList
      className={`favorites__places`}
      cardStyle={CARD_STYLE}
      offers={props.offers}
    />
  );
};

OffersListFavorite.propTypes = {
  offers: offersType,
};

export default OffersListFavorite;
