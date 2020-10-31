import {extend} from "../util";
import {ActionType} from "./actions";

const initialState = {
  allOffers: [],
  favoriteOfferIds: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_ALL_OFFERS:
      return extend(state, {
        allOffers: action.payload,
      });
    case ActionType.ADD_FAVORITE:
      return extend(state, {
        favoriteOfferIds: [...state.favoriteOfferIds, action.payload],
      });
    case ActionType.REMOVE_FAVORITE:
      return extend(state, {
        favoriteOfferIds: state.favoriteOfferIds.filter((id) => action.payload !== id),
      });
  }

  return state;
};

export {reducer};
