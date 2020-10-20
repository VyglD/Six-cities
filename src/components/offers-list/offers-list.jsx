import React from "react";
import {favoriteOfferIdsType, notRequiredCityNameType, offersType, stringType} from "../../types";
import OfferCard from "../offer-card/offer-card";

class OffersList extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {favoriteOfferIds, activeCity} = this.props;
    return favoriteOfferIds.length !== nextProps.favoriteOfferIds.length
      || activeCity !== nextProps.activeCity;
  }

  render() {
    const {className, offers} = this.props;

    return (
      <div className={className}>
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            {...this.props}
          />
        ))}
      </div>
    );
  }
}

OffersList.propTypes = {
  offers: offersType,
  className: stringType,
  favoriteOfferIds: favoriteOfferIdsType,
  activeCity: notRequiredCityNameType,
};

export default OffersList;
