import {extend} from "../../util";
import {ActionType} from "./user-actions";

const initialState = {
  isLogin: false,
  email: ``,
  avatar: ``,
  isSuper: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      const {email, avatar, isSuper} = action.payload;

      return extend(state, {
        isLogin: true,
        email,
        avatar,
        isSuper,
      });
    case ActionType.LOGOUT:
      return extend(state, initialState);
  }

  return state;
};

export default reducer;
