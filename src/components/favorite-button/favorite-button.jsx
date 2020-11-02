import React from "react";
import {connect} from "react-redux";
import ActionCreator from "../../store/root-actions";
import {
  offerType,
  offerIdsType,
  functionType,
  boolType,
  favoriteBtnStyleType,
} from "../../types";
import {Path} from "../../const";
import {getArraysDifference} from "../../util";

class FavoriteButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const {favoriteOfferIds, offer} = this.props;

    return getArraysDifference(
        nextProps.favoriteOfferIds,
        favoriteOfferIds
    ).includes(offer.id);
  }

  handleFavoriteClick() {
    const {
      favoriteOfferIds,
      isLogin,
      offer,
      deleteFavorite,
      addFavorite,
      redirectTo,
    } = this.props;

    if (isLogin) {
      if (favoriteOfferIds.includes(offer.id)) {
        deleteFavorite(offer.id);
      } else {
        addFavorite(offer.id);
      }
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
      favoriteOfferIds,
      offer,
    } = this.props;

    return (
      <button
        className={`button ${btnClassName} ${
          favoriteOfferIds.includes(offer.id) ? btnActiveClassName : ``
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
  favoriteOfferIds: offerIdsType,
  isLogin: boolType,
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
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
