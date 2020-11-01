import ActionCreator from "../store/root-actions";
import {adaptOfferToClient, adaptReviewToClient} from "../adapters";

export const fetchOffersList = () => (dispatch, _getState, api) => {
  return api.get(`/hotels`)
    .then(({data}) => {
      dispatch(ActionCreator.loadOffers(data.map(adaptOfferToClient)));
    });
};

export const fetchReviews = () => (dispatch, getState, api) => {
  return api.get(`/comments/${getState().REVIEWS.openedOfferId}`)
    .then(({data}) => {
      dispatch(ActionCreator.loadReviews(data.map(adaptReviewToClient)));
    });
};
