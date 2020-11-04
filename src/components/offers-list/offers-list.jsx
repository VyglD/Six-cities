import React from "react";
import OfferCard from "../offer-card/offer-card";
import {offersType, stringType} from "../../types";

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
};

export default OffersList;
