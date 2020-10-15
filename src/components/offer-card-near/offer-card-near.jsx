import React from "react";
import OfferCard from "../offer-card/offer-card";

const cardStyle = {
  article: `near-places__card`,
  imgWrapper: `near-places__image-wrapper`,
};

const OfferCardNear = (props) => {
  return (
    <OfferCard
      {...props}
      cardStyle={cardStyle}
    />
  );
};

export default OfferCardNear;
