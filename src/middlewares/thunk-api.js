import ActionCreator from "../store/root-actions";
import {} from "../middlewares/redirect";
import {adaptOfferToClient, adaptReviewToClient} from "../adapters";
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

export const fetchOffersList = () => (dispatch, _getState, api) => {
  return api.get(APIRoute.OFFERS)
    .then(({data}) => {
      dispatch(ActionCreator.loadOffers(data.map(adaptOfferToClient)));
    });
};

export const fetchReviews = () => (dispatch, getState, api) => {
  return api.get(`${APIRoute.REVIEWS}/${getState().OFFER.openedOfferId}`)
    .then(({data}) => {
      dispatch(ActionCreator.loadReviews(data.map(adaptReviewToClient)));
    });
};

export const addNewReview = ({offerId, comment, rating}) => (dispatch, getState, api) => {
  return api.post(`${APIRoute.REVIEWS}/${offerId}`, {comment, rating})
    .then(({data}) => {
      dispatch(ActionCreator.loadReviews(data.map(adaptReviewToClient)));
    });
};

export const fetchNearOffers = () => (dispatch, getState, api) => {
  return api.get(
      `${APIRoute.OFFERS}/${getState().OFFER.openedOfferId}${APIRoute.NEAR}`
  )
    .then(({data}) => {
      dispatch(ActionCreator.loadNearOffers(data.map(adaptOfferToClient)));
    });
};

export const getFavorites = () => (dispatch, getState, api) => {
  return api.get(APIRoute.FAVORITE)
    .then(({data}) => {
      dispatch(ActionCreator.updateFavotites(data.map((offer) => String(offer.id))));
    })
    .catch(() => {
      dispatch(ActionCreator.updateFavotites([]));
    });
};

export const changeFavorite = ({offerId, status}) => (dispatch, getState, api) => {
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

export const checkAuth = () => (dispatch, _getState, api) => {
  return api.get(APIRoute.LOGIN)
    .then(({data}) => {
      dispatch(ActionCreator.login(getLoginData(data)));
      dispatch(getFavorites());
    })
    .catch(({response}) => {
      if (response.status === HttpCode.UNAUTHORIZED) {
        ActionCreator.logout();
      }
    });
};

export const tryLogin = ({email, password}) => (dispatch, _getState, api) => {
  return api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      dispatch(ActionCreator.login(getLoginData(data)));
      dispatch(getFavorites());
      dispatch(ActionCreator.redirectTo(Path.MAIN));
    });
};
