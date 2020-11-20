import React from "react";
import OffersList from "../offers-list/offers-list";
import {SortType, OffersListProps} from "../../const";
import {sortType, offersType, functionType} from "../../types";

const OffersListMain = (props) => {
  const {offers, activeSort, onActiveCardChange} = props;

  const sortMethod = Object.values(SortType)
    .find(({value}) => value === activeSort)
    .method;

  const sortOffers = offers.slice().sort(sortMethod);

  return (
    <OffersList
      offers={sortOffers}
      className={OffersListProps.MAIN.containerClass}
      cardStyle={OffersListProps.MAIN.cardStyle}
      onActiveCardChange={onActiveCardChange}
    />
  );
};

OffersListMain.propTypes = {
  offers: offersType,
  activeSort: sortType,
  onActiveCardChange: functionType,
};

export default OffersListMain;
