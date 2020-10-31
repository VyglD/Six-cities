export const ActionType = {
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  OPEN_OFFER: `OPEN_OFFER`,
};

export const ActionCreator = {
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews,
  }),
  openOffer: (offerId) => ({
    type: ActionType.OPEN_OFFER,
    payload: offerId,
  }),
};
