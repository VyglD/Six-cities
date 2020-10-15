import React from "react";
import OfferCard from "../offer-card/offer-card";

const cardStyle = {
  article: `favorites__card`,
  imgWrapper: `favorites__image-wrapper`,
  imgWidth: 150,
  imgHeight: 110,
  info: `favorites__card-info`,
};

const OfferCardFavorite = (props) => {
  return (
    <OfferCard
      {...props}
      cardStyle={cardStyle}
    />
  );
};

export default OfferCardFavorite;
