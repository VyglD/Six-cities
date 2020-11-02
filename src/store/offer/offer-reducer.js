import {extend} from "../../util";
import {ActionType} from "./offer-actions";

const initialState = {
  openedOfferId: null,
  reviews: [],
  nearOffers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.OPEN_OFFER:
      if (state.openedOfferId === action.payload) {
        return state;
      }

      return extend(state, {
        openedOfferId: action.payload,
        reviews: [],
        nearOffers: [],
      });
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
    case ActionType.LOAD_NEAR_OFFERS:
      return extend(state, {
        nearOffers: action.payload,
      });
  }

  return state;
};

export default reducer;
