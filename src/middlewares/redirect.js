import browserHistory from "../browser-history";
import {ActionType} from "../store/redirect/redirect-actions";

const redirect = (_store) => (next) => (action) => {
  if (action.type === ActionType.REDIRECT_TO_ROUTE) {
    browserHistory.push(action.payload);
  }

  return next(action);
};

export {redirect};
