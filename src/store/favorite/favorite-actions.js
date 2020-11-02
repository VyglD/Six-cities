export const ActionType = {
  ADD_FAVORITE: `ADD_FAVORITE`,
  DELETE_FAVORITE: `REMOVE_FAVORITE`,
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
};
