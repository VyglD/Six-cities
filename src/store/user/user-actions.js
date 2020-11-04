export const ActionType = {
  LOGIN: `LOGIN`,
  LOGOUT: `LOGOUT`,
};

export const ActionCreator = {
  login: (data) => ({
    type: ActionType.LOGIN,
    payload: data,
  }),
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
};
