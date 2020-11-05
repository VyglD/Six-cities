import {extend} from "../../util";
import {ActionType} from "./city-actions";
import {CITIES} from "../../const";

const initialState = {
  activeCity: CITIES[1],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        activeCity: action.payload,
      });
  }

  return state;
};

export default reducer;
