import React from "react";
import OffersList from "../offers-list/offers-list";
import {offersType} from "../../types";

const CARD_STYLE = {
  article: `near-places__card`,
  imgWrapper: `near-places__image-wrapper`,
};

const OffersListNear = (props) => {
  return (
    <OffersList
      className={`near-places__list places__list`}
      cardStyle={CARD_STYLE}
      offers={props.offers}
    />
  );
};

OffersListNear.propTypes = {
  offers: offersType,
};

export default OffersListNear;
