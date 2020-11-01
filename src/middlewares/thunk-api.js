import ActionCreator from "../store/root-actions";
import {adaptOfferToClient} from "../adapters";

export const fetchOffersList = () => (dispatch, _getState, api) => {
  return api.get(`/hotels`)
    .then(({data}) => {
      dispatch(ActionCreator.loadOffers(data.map(adaptOfferToClient)));
    });
};
