export const ActionType = {
  LOAD_ALL_OFFERS: `LOAD_ALL_OFFERS`,
  ADD_FAVORITE: `ADD_FAVORITE`,
  REMOVE_FAVORITE: `REMOVE_FAVORITE`,
};

export const loadAllOffers = (AllOffers) => ({
  type: ActionType.LOAD_ALL_OFFERS,
  payload: AllOffers,
});

export const addFavorite = (offerId) => ({
  type: ActionType.ADD_FAVORITE,
  payload: offerId,
});

export const removeFavorite = (offerId) => ({
  type: ActionType.REMOVE_FAVORITE,
  payload: offerId,
});
