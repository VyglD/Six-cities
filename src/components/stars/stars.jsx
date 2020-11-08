import React from "react";
import {offerType, stringType} from "../../types";
import {getRateVisualisation} from "../../util";

const Stars = (props) => {
  const {offer, customClass} = props;

  return (
    <div className={`${customClass} rating__stars`}>
      <span style={getRateVisualisation(offer.rate)}></span>
      <span className="visually-hidden">Rating</span>
    </div>
  );
};

Stars.propTypes = {
  offer: offerType,
  customClass: stringType,
};

export default Stars;
