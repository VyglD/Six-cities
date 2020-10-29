import {loadAllOffers} from "./actions";
import {adaptOfferToClient} from "../adapters";

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(`/hotels`)
    .then(({data}) => {
      dispatch(loadAllOffers(data.map(adaptOfferToClient)));
    })
);
