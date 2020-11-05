import React from "react";
import OffersList from "../offers-list/offers-list";
import {SortType} from "../../const";
import {cityNameType, sortType, offersType, functionType} from "../../types";

const CARD_STYLE = {
  article: `cities__place-card`,
  imgWrapper: `cities__image-wrapper`,
};

class OffersListMain extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {activeCity, activeSort} = this.props;

    if (
      activeCity !== nextProps.activeCity
      || activeSort !== nextProps.activeSort
    ) {
      return true;
    }

    return false;
  }

  render() {
    const {offers, activeSort, onActiveCardChange} = this.props;

    const sortMethod = Object.values(SortType)
      .find(({value}) => value === activeSort)
      .method;

    const sortOffers = offers.slice().sort(sortMethod);

    return (
      <OffersList
        className={`cities__places-list places__list tabs__content`}
        cardStyle={CARD_STYLE}
        offers={sortOffers}
        onActiveCardChange={onActiveCardChange}
      />
    );
  }
}

OffersListMain.propTypes = {
  offers: offersType,
  activeCity: cityNameType,
  activeSort: sortType,
  onActiveCardChange: functionType,
};

export default OffersListMain;
