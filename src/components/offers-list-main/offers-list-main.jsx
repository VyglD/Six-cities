import React from "react";
import OffersList from "../offers-list/offers-list";
// import {isArraysEqual} from "../../util";
// import {cityNameType, emailType, favoriteOfferIdsType} from "../../types";

const cardStyle = {
  article: `cities__place-card`,
  imgWrapper: `cities__image-wrapper`,
};

class OffersListMain extends React.Component {
  // shouldComponentUpdate(nextProps) {
  //   if (
  //     this.props.activeCity !== nextProps.activeCity
  //     || nextProps.email
  //     && !isArraysEqual(nextProps.favoriteOfferIds, this.props.favoriteOfferIds)
  //   ) {
  //     return true;
  //   }

  //   // ToDo:
  //   // Обновление может быть вызвано изменением сортировки
  //   // Обновление не происходит при изменении activeOffer
  //   return false;
  // }

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
//   email: emailType,
//   favoriteOfferIds: favoriteOfferIdsType,
//   activeCity: cityNameType,
};

export default OffersListMain;
