import React from "react";
import PlacesSorting from "../places-sorting/places-sorting";
import OffersListMain from "../offers-list-main/offers-list-main";
import {SortType} from "../../const";
import {functionType, offersType, cityNameType, sortType} from "../../types";

import withActiveItem from "../../hocs/with-active-item/with-active-item";

class PlacesOffers extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {activeSort, activeCity} = this.props;

    return activeSort !== nextProps.activeSort || activeCity !== nextProps.activeCity;
  }

  render() {
    const {
      activeCity,
      offers,
      activeSort,
      onChangeActiveSort,
      onActiveCardChange
    } = this.props;

    return (
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {activeCity}</b>
        <PlacesSorting
          activeSort={activeSort}
          onChangeActiveSort={onChangeActiveSort}
        />
        <OffersListMain
          activeCity={activeCity}
          activeSort={activeSort}
          offers={offers}
          onActiveCardChange={onActiveCardChange}
        />
      </section>
    );
  }
}

PlacesOffers.propTypes = {
  offers: offersType,
  activeCity: cityNameType,
  activeSort: sortType,
  onChangeActiveSort: functionType,
  onActiveCardChange: functionType,
};

export {PlacesOffers};
export default withActiveItem(
    PlacesOffers,
    {
      initialActiveItem: SortType.DEFAULT.value,
      activeItemName: `activeSort`,
      onItemChangeName: `onChangeActiveSort`,
    }
);
