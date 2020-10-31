import ActionCreator from "./root-actions";
import {adaptOfferToClient} from "../adapters";

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(`/hotels`)
    .then(({data}) => {
      dispatch(ActionCreator.loadOffers(data.map(adaptOfferToClient)));
    })
);
