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
        offers: action.payload,
      });
    case ActionType.OPEN_OFFER:
      return extend(state, {
        openedOfferId: action.payload,
      });
  }

  return state;
};

export default reducer;
