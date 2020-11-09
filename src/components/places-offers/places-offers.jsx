import React from "react";
import PlacesSorting from "../places-sorting/places-sorting";
import OffersListMain from "../offers-list-main/offers-list-main";
import {SortType} from "../../const";
import {functionType, offersType, cityNameType, sortType} from "../../types";

import withActiveItem from "../../hocs/with-active-item/with-active-item";

const PlacesOffers = (props) => {
  const {
    activeCity,
    offers,
    activeSort,
    onActiveSortChange,
    onActiveCardChange,
  } = props;

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {activeCity}</b>
      <PlacesSorting
        activeSort={activeSort}
        onActiveSortChange={onActiveSortChange}
      />
      <OffersListMain
        activeSort={activeSort}
        offers={offers}
        onActiveCardChange={onActiveCardChange}
      />
    </section>
  );
};

PlacesOffers.propTypes = {
  offers: offersType,
  activeCity: cityNameType,
  activeSort: sortType,
  onActiveSortChange: functionType,
  onActiveCardChange: functionType,
};

export {PlacesOffers};
export default withActiveItem(
    PlacesOffers,
    {
      initialActiveItem: SortType.DEFAULT.value,
      activeItemName: `activeSort`,
      onItemChangeName: `onActiveSortChange`,
    }
);
