import React from "react";
import OfferCard from "../offer-card/offer-card";

const cardStyle = {
  article: `cities__place-card`,
  imgWrapper: `cities__image-wrapper`,
};

const OfferCardMain = (props) => {
  return (
    <OfferCard
      {...props}
      cardStyle={cardStyle}
    />
  );
};

export default OfferCardMain;
