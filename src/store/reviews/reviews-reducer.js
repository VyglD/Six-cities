import {extend} from "../../util";
import {ActionType} from "./reviews-actions";

const initialState = {
  openedOfferId: null,
  reviews: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
    case ActionType.OPEN_OFFER:
      if (state.openedOfferId === action.payload) {
        return state;
      }

      return extend(state, {
        openedOfferId: action.payload,
        reviews: [],
      });
  }

  return state;
};

export default reducer;
