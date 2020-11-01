import React from "react";
import OffersList from "../offers-list/offers-list";
import {cityNameType} from "../../types";

const cardStyle = {
  article: `cities__place-card`,
  imgWrapper: `cities__image-wrapper`,
};

class OffersListMain extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.activeCity !== nextProps.activeCity) {
      return true;
    }

    // ToDo:
    // Обновление может быть вызвано изменением сортировки
    return false;
  }

  render() {
    return (
      <OffersList
        className={`cities__places-list places__list tabs__content`}
        cardStyle={cardStyle}
        {...this.props}
      />
    );
  }
}

OffersListMain.propTypes = {
  activeCity: cityNameType,
};

export default OffersListMain;
