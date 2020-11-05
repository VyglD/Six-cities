import React from "react";
import PlacesSorting from "../places-sorting/places-sorting";
import OffersListMain from "../offers-list-main/offers-list-main";
import {SortType} from "../../const";
import {functionType, offersType, cityNameType, sortType} from "../../types";

import withActiveItem from "../../hocs/with-active-item/with-active-item";

class PlacesOffers extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.propsactiveSort !== nextProps.activeSort) {
      return true;
    }

    return false;
  }

  render() {
    const {activeCity, offers} = this.props;

    return (
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {activeCity}</b>
        <PlacesSorting
          {...this.props}
        />
        <OffersListMain
          {...this.props}
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
