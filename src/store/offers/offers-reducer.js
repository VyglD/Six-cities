import {extend} from "../../util";
import {ActionType} from "./offers-actions";

const initialState = {
  allOffers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        allOffers: action.payload,
      });
  }

  return state;
};

export default reducer;
