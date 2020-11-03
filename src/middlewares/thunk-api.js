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

export const fetchNearOffers = () => (dispatch, getState, api) => {
  return api.get(
      `${APIRoute.OFFERS}/${getState().OFFER.openedOfferId}${APIRoute.NEAR}`
  )
    .then(({data}) => {
      dispatch(ActionCreator.loadNearOffers(data.map(adaptOfferToClient)));
    });
};

export const checkAuth = () => (dispatch, _getState, api) => {
  return api.get(APIRoute.LOGIN)
    .then(({data}) => {
      dispatch(ActionCreator.login(getLoginData(data)));
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
      dispatch(ActionCreator.redirectTo(Path.MAIN));
    });
};
