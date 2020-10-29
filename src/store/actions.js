export const ActionType = {
  LOAD_ALL_OFFERS: `LOAD_ALL_OFFERS`,
  CHANGE_FAVORITE: `CHANGE_FAVORITE`,
};

export const loadAllOffers = (AllOffers) => ({
  type: ActionType.LOAD_ALL_OFFERS,
  payload: AllOffers,
});

export const changeFavorite = (offer) => ({
  type: ActionType.CHANGE_FAVORITE,
  payload: offer,
});
