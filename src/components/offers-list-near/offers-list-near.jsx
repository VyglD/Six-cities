import React from "react";
import OffersList from "../offers-list/offers-list";

const cardStyle = {
  article: `near-places__card`,
  imgWrapper: `near-places__image-wrapper`,
};

const OffersListNear = (props) => {
  return (
    <OffersList
      className={`near-places__list places__list`}
      cardStyle={cardStyle}
      {...props}
    />
  );
};

export default OffersListNear;
