import {extend} from "../util";
import {ActionType} from "./actions";

const initialState = {
  allOffers: [],
  favoriteOfferIds: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_ALL_OFFERS:
      return extend(state, {
        allOffers: action.payload,
      });
    case ActionType.CHANGE_FAVORITE:
      const offerId = action.payload.id;
      const favoritesIds = state.favoriteOfferIds;
      let newFavoriteIds = [];

      if (favoritesIds.includes(offerId)) {
        newFavoriteIds = favoritesIds.filter((id) => id !== offerId);
      } else {
        newFavoriteIds = [...favoritesIds, offerId];
      }

      return extend(state, {
        favoriteOfferIds: newFavoriteIds,
      });
  }

  return state;
};

export {reducer};
