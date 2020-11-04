import {extend} from "../../util";
import {ActionType} from "./favorite-actions";

const initialState = {
  favoriteIds: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_FAVORITE:
      return extend(state, {
        favoriteIds: [...state.favoriteIds, action.payload],
      });
    case ActionType.DELETE_FAVORITE:
      return extend(state, {
        favoriteIds: state.favoriteIds.filter((id) => action.payload !== id),
      });
    case ActionType.UPDATE_FAVORITES:
      return extend(state, {
        favoriteIds: action.payload,
      });
  }

  return state;
};

export default reducer;
