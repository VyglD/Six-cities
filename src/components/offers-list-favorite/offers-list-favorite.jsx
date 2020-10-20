import React from "react";
import OffersList from "../offers-list/offers-list";

const cardStyle = {
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
      cardStyle={cardStyle}
      {...props}
    />
  );
};

export default OffersListFavorite;
