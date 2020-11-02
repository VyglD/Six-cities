import ActionCreator from "../store/root-actions";
import {adaptOfferToClient, adaptReviewToClient} from "../adapters";
import {APIRoute} from "../const";

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
