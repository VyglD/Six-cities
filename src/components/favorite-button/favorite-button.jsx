import React from "react";
import {connect} from "react-redux";
import {changeFavorite} from "../../middlewares/thunk-api";
import {
  offerType,
  offerIdsType,
  functionType,
  favoriteBtnStyleType,
} from "../../types";

const FavoriteButton = (props) => {
  const {
    favoriteBtnStyle,
    favoriteIds,
    offer,
    deleteFavorite,
    addFavorite,
  } = props;

  const {
    btnClassName,
    btnActiveClassName,
    iconClassName,
    iconWidth,
    iconHeight,
  } = favoriteBtnStyle;

  const isFavorite = favoriteIds.includes(offer.id);

  const handleFavoriteClick = React.useCallback(
      () => {
        if (isFavorite) {
          deleteFavorite(offer.id);
        } else {
          addFavorite(offer.id);
        }
      },
      [isFavorite, offer.id, addFavorite, deleteFavorite]
  );

  return (
    <button
      className={`button ${btnClassName} ${isFavorite ? btnActiveClassName : ``}`}
      type="button"
      onClick={handleFavoriteClick}
    >
      <svg className={iconClassName} width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

FavoriteButton.propTypes = {
  offer: offerType,
  favoriteIds: offerIdsType,
  deleteFavorite: functionType,
  addFavorite: functionType,
  favoriteBtnStyle: favoriteBtnStyleType,
};

const mapStateToProps = ({FAVORITES}) => ({
  favoriteIds: FAVORITES.favoriteIds,
});

const mapDispatchToProps = (dispatch) => ({
  deleteFavorite(offerId) {
    dispatch(changeFavorite({offerId, status: 0}));
  },
  addFavorite(offerId) {
    dispatch(changeFavorite({offerId, status: 1}));
  },
});

export {FavoriteButton};
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
