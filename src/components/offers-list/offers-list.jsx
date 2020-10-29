import React from "react";
import {favoriteOfferIdsType, notRequiredCityNameType, offersType, stringType} from "../../types";
import OfferCard from "../offer-card/offer-card";

const OffersList = (props) => {
  const {className, offers} = props;
  return (
    <div className={className}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          {...props}
        />
      ))}
    </div>
  );
};

OffersList.propTypes = {
  offers: offersType,
  className: stringType,
  favoriteOfferIds: favoriteOfferIdsType,
  activeCity: notRequiredCityNameType,
};

export default OffersList;
