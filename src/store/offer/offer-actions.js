const ActionType = {
  OPEN_OFFER: `OPEN_OFFER`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_NEAR_OFFERS: `LOAD_NEAR_OFFERS`,
};

const ActionCreator = {
  openOffer: (offerId) => ({
    type: ActionType.OPEN_OFFER,
    payload: offerId,
  }),
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews,
  }),
  loadNearOffers: (offers) => ({
    type: ActionType.LOAD_NEAR_OFFERS,
    payload: offers,
  }),
};

export {
  ActionType,
  ActionCreator,
};
