import ActionCreator from "../store/root-actions";
import {getFirstNotEmptyCity} from "../store/selectors";
import {adaptOfferToClient, adaptReviewsToClient} from "../adapters";
import {APIRoute, Path} from "../const";

const HttpCode = {
  UNAUTHORIZED: 401
};

const getLoginData = (data) => {
  return {
    email: data.email,
    avatar: data[`avatar_url`],
    isSuper: data[`is_pro`],
  };
};

const fetchOffersList = () => (dispatch, getState, api) => {
  return api.get(APIRoute.OFFERS)
    .then(({data}) => {
      dispatch(ActionCreator.loadOffers(data.map(adaptOfferToClient)));
      dispatch(ActionCreator.changeCity(getFirstNotEmptyCity(getState())));
    });
};

const fetchReviews = () => (dispatch, getState, api) => {
  return api.get(`${APIRoute.REVIEWS}/${getState().OFFER.openedOfferId}`)
    .then(({data}) => {
      dispatch(ActionCreator.loadReviews(adaptReviewsToClient(data)));
    });
};

const addNewReview = ({offerId, comment, rating}) => (dispatch, _getState, api) => {
  return api.post(`${APIRoute.REVIEWS}/${offerId}`, {comment, rating})
    .then(({data}) => {
      dispatch(ActionCreator.loadReviews(adaptReviewsToClient(data)));
    });
};

const fetchNearOffers = () => (dispatch, getState, api) => {
  return api.get(
      `${APIRoute.OFFERS}/${getState().OFFER.openedOfferId}${APIRoute.NEAR}`
  )
    .then(({data}) => {
      dispatch(ActionCreator.loadNearOffers(data.map(adaptOfferToClient)));
    });
};

const getFavorites = () => (dispatch, _getState, api) => {
  return api.get(APIRoute.FAVORITE)
    .then(({data}) => {
      dispatch(ActionCreator.updateFavotites(data.map((offer) => String(offer.id))));
    })
    .catch(() => {
      dispatch(ActionCreator.updateFavotites([]));
    });
};

const changeFavorite = ({offerId, status}) => (dispatch, getState, api) => {
  if (getState().USER.isLogin) {
    return api.post(`${APIRoute.FAVORITE}/${offerId}/${status}`)
    .then(({data}) => {
      if (data[`is_favorite`]) {
        dispatch(ActionCreator.addFavorite(String(data.id)));
      } else {
        dispatch(ActionCreator.deleteFavorite(String(data.id)));
      }
    });
  } else {
    return dispatch(ActionCreator.redirectTo(Path.LOGIN));
  }
};

const checkAuth = () => (dispatch, _getState, api) => {
  return api.get(APIRoute.LOGIN)
    .then(({data}) => {
      dispatch(ActionCreator.logIn(getLoginData(data)));
      dispatch(getFavorites());
    })
    .catch(({response}) => {
      if (response.status === HttpCode.UNAUTHORIZED) {
        ActionCreator.logOut();
      }
    });
};

const tryLogin = ({email, password}) => (dispatch, _getState, api) => {
  return api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      dispatch(ActionCreator.logIn(getLoginData(data)));
      dispatch(getFavorites());
      dispatch(ActionCreator.redirectTo(Path.MAIN));
    });
};

export {
  fetchOffersList,
  fetchReviews,
  addNewReview,
  fetchNearOffers,
  getFavorites,
  changeFavorite,
  checkAuth,
  tryLogin,
};
