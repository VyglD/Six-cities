import {extend} from "../../util";
import {ActionType} from "./favorite-actions";

const initialState = {
  favoriteOfferIds: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_FAVORITE:
      return extend(state, {
        favoriteOfferIds: [...state.favoriteOfferIds, action.payload],
      });
    case ActionType.DELETE_FAVORITE:
      return extend(state, {
        favoriteOfferIds: state.favoriteOfferIds.filter((id) => action.payload !== id),
      });
  }

  return state;
};

export default reducer;
