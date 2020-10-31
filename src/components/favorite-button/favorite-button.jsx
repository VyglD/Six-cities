import React from "react";
import {connect} from "react-redux";
import {
  addFavorite as addFavoriteAction,
  removeFavorite as removeFavoriteAction
} from "../../store/actions";
import {
  offerType,
  favoriteOfferIdsType,
  functionType,
  emailType,
  boolType,
  favoriteBtnStyleType,
} from "../../types";

import withActiveItem from "../../hocs/with-active-item/with-active-item";

class FavoriteButton extends React.PureComponent {
  constructor(props) {
    super(props);

    const {email, favoriteOfferIds, offer, onFavoritesChange} = props;

    if (email) {
      onFavoritesChange(favoriteOfferIds.includes(offer.id));
    }

    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  handleFavoriteClick() {
    const {
      isFavorite,
      onFavoritesChange,
      email,
      offer,
      removeFavorite,
      addFavorite,
    } = this.props;

    if (email) {
      if (isFavorite) {
        removeFavorite(offer.id);
      } else {
        addFavorite(offer.id);
      }

      onFavoritesChange(!isFavorite);
    } else {
      // перенаправление на страницу авторизации
    }
  }

  render() {
    const {
      favoriteBtnStyle: {
        btnClassName = `place-card__bookmark-button`,
        btnActiveClassName = `place-card__bookmark-button--active`,
        iconClassName = `place-card__bookmark-icon`,
        iconWidth = 18,
        iconHeight = 19,
      } = {},
      isFavorite,
    } = this.props;

    return (
      <button
        className={`button ${btnClassName} ${isFavorite ? btnActiveClassName : ``}`}
        type="button"
        onClick={this.handleFavoriteClick}
      >
        <svg className={iconClassName} width={iconWidth} height={iconHeight}>
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">To bookmarks</span>
      </button>
    );
  }
}

FavoriteButton.propTypes = {
  offer: offerType,
  favoriteOfferIds: favoriteOfferIdsType,
  email: emailType,
  onFavoritesChange: functionType,
  isFavorite: boolType,
  removeFavorite: functionType,
  addFavorite: functionType,
  favoriteBtnStyle: favoriteBtnStyleType,
};

const mapDispatchToProps = (dispatch) => ({
  removeFavorite(offerId) {
    dispatch(removeFavoriteAction(offerId));
  },
  addFavorite(offerId) {
    dispatch(addFavoriteAction(offerId));
  }
});

export {FavoriteButton};
export default withActiveItem(
    connect(null, mapDispatchToProps)(FavoriteButton),
    {
      initialActiveItem: false,
      activeItemName: `isFavorite`,
      onItemChangeName: `onFavoritesChange`,
    }
);
