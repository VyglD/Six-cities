import React from "react";
import {connect} from "react-redux";
import {changeFavorite} from "../../middlewares/thunk-api";
import {
  offerType,
  offerIdsType,
  functionType,
  favoriteBtnStyleType,
} from "../../types";
import {getArraysDifference} from "../../util";

class FavoriteButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const {favoriteIds, offer} = this.props;

    return getArraysDifference(
        nextProps.favoriteIds,
        favoriteIds
    ).includes(offer.id);
  }

  handleFavoriteClick() {
    const {
      favoriteIds,
      offer,
      deleteFavorite,
      addFavorite,
    } = this.props;

    if (favoriteIds.includes(offer.id)) {
      deleteFavorite(offer.id);
    } else {
      addFavorite(offer.id);
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
      favoriteIds,
      offer,
    } = this.props;

    return (
      <button
        className={`button ${btnClassName} ${
          favoriteIds.includes(offer.id) ? btnActiveClassName : ``
        }`}
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
