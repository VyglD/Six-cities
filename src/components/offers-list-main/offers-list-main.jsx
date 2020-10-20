import React from "react";
import OffersList from "../offers-list/offers-list";


const cardStyle = {
  article: `cities__place-card`,
  imgWrapper: `cities__image-wrapper`,
};

const OffersListMain = (props) => {
  return (
    <OffersList
      className={`cities__places-list places__list tabs__content`}
      cardStyle={cardStyle}
      {...props}
    />
  );
};

export default OffersListMain;
