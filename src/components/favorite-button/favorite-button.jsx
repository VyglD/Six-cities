import React from "react";
import {connect} from "react-redux";
import ActionCreator from "../../store/root-actions";
import {
  offerType,
  favoriteOfferIdsType,
  functionType,
  boolType,
  favoriteBtnStyleType,
} from "../../types";
import {Path} from "../../const";

import withActiveItem from "../../hocs/with-active-item/with-active-item";

class FavoriteButton extends React.PureComponent {
  constructor(props) {
    super(props);

    const {isLogin, favoriteOfferIds, offer, onFavoritesChange} = props;

    if (isLogin) {
      onFavoritesChange(favoriteOfferIds.includes(offer.id));
    }

    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  handleFavoriteClick() {
    const {
      isFavorite,
      onFavoritesChange,
      isLogin,
      offer,
      deleteFavorite,
      addFavorite,
      redirectTo,
    } = this.props;

    if (isLogin) {
      if (isFavorite) {
        deleteFavorite(offer.id);
      } else {
        addFavorite(offer.id);
      }

      onFavoritesChange(!isFavorite);
    } else {
      redirectTo(Path.LOGIN);
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
  isLogin: boolType,
  onFavoritesChange: functionType,
  isFavorite: boolType,
  deleteFavorite: functionType,
  addFavorite: functionType,
  redirectTo: functionType,
  favoriteBtnStyle: favoriteBtnStyleType,
};

const mapStateToProps = ({USER, FAVORITES}) => ({
  isLogin: USER.isLogin,
  favoriteOfferIds: FAVORITES.favoriteOfferIds,
});

const mapDispatchToProps = (dispatch) => ({
  deleteFavorite(offerId) {
    dispatch(ActionCreator.deleteFavorite(offerId));
  },
  addFavorite(offerId) {
    dispatch(ActionCreator.addFavorite(offerId));
  },
  redirectTo(url) {
    dispatch(ActionCreator.redirectTo(url));
  }
});

export {FavoriteButton};
export default withActiveItem(
    connect(mapStateToProps, mapDispatchToProps)(FavoriteButton),
    {
      initialActiveItem: false,
      activeItemName: `isFavorite`,
      onItemChangeName: `onFavoritesChange`,
    }
);
