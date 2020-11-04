export const ActionType = {
  ADD_FAVORITE: `ADD_FAVORITE`,
  DELETE_FAVORITE: `REMOVE_FAVORITE`,
  UPDATE_FAVORITES: `UPDATE_FAVORITES`,
};

export const ActionCreator = {
  addFavorite: (offerId) => ({
    type: ActionType.ADD_FAVORITE,
    payload: offerId,
  }),
  deleteFavorite: (offerId) => ({
    type: ActionType.DELETE_FAVORITE,
    payload: offerId,
  }),
  updateFavotites: (offersIds) => ({
    type: ActionType.UPDATE_FAVORITES,
    payload: offersIds,
  }),
};
