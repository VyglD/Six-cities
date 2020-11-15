import React from "react";
import PlacesSorting from "../places-sorting/places-sorting";
import OffersListMain from "../offers-list-main/offers-list-main";
import {SortType} from "../../const";
import {functionType, offersType, cityNameType} from "../../types";

const PlacesOffers = (props) => {
  const {
    activeCity,
    offers,
    onActiveCardChange,
  } = props;
  const [activeSort, setActiveSort] = React.useState(SortType.DEFAULT.value);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {activeCity}</b>
      <PlacesSorting
        activeSort={activeSort}
        onActiveSortChange={setActiveSort}
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
  onActiveCardChange: functionType,
};

export default React.memo(PlacesOffers);
