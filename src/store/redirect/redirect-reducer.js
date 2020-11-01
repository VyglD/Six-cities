import {ActionType} from "./redirect-actions";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REDIRECT_TO_ROUTE:
      return state;
  }

  return state;
};

export default reducer;
