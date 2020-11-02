export const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
};

export const ActionCreator = {
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
};
