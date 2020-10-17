export const ActionType = {
  CHANGE_ACTIVE_CITY: `CHANGE_ACTIVE_CITY`,
};

export const ActionCreater = {
  changeActiveCity: (newCity) => ({
    type: ActionType.CHANGE_ACTIVE_CITY,
    payload: newCity,
  }),
};
