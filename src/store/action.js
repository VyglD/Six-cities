export const ActionType = {
  CHANGE_ACTIVE_CITY: `CHANGE_ACTIVE_CITY`,
  CHANGE_ACTIVE_OFFER: `CHANGE_ACTIVE_OFFER`,
};

export const ActionCreater = {
  changeActiveCity: (newCity) => ({
    type: ActionType.CHANGE_ACTIVE_CITY,
    payload: newCity,
  }),
  changeActiveOffer: (newOffer) => ({
    type: ActionType.CHANGE_ACTIVE_OFFER,
    payload: newOffer,
  }),
};
