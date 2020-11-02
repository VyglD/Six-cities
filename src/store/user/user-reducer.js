import {extend} from "../../util";
import {ActionType} from "./user-actions";

const initialState = {
  isLogin: false,
  email: ``,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return extend(state, {
        isLogin: true,
        email: action.payload,
      });
  }

  return state;
};

export default reducer;
