import React from "react";
import OfferCard from "../offer-card/offer-card";
import {
  cardStyleType,
  notRequiredFunctionType,
  offersType,
  stringType
} from "../../types";

const OffersList = (props) => {
  const {className, offers, onActiveCardChange, cardStyle} = props;

  return (
    <div className={className}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          cardStyle={cardStyle}
          onActiveCardChange={onActiveCardChange}
        />
      ))}
    </div>
  );
};

OffersList.propTypes = {
  offers: offersType,
  className: stringType,
  cardStyle: cardStyleType,
  onActiveCardChange: notRequiredFunctionType
};

export default OffersList;
